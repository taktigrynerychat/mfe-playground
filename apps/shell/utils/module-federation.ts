type Scope = unknown;
type Factory = () => any;

type Container = {
  init(shareScope: Scope, initScope?: Scope): void;
  get(module: string, getScope?: Scope): Factory;
};

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope, plugin: Scope };
declare const window: Window & Record<string, Container>;

const moduleMap: Record<string, boolean> = {};

export function loadRemoteEntry(remoteEntry: string): Promise<boolean> {
  return new Promise<any>((resolve, reject) => {
    if (moduleMap[remoteEntry]) {
      resolve(moduleMap[remoteEntry]);
      return;
    }

    const script = document.createElement('script');
    script.src = remoteEntry;

    script.onerror = reject;

    script.onload = () => {
      moduleMap[remoteEntry] = true;
      resolve(moduleMap[remoteEntry]); // window is the global namespace
    };

    document.body.append(script);
  });
}

async function lookupExposedRemote<T>(
  remoteName: string,
  exposedModule: string
): Promise<T> {
  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  await __webpack_init_sharing__('default');
  const container = window[remoteName];

  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(exposedModule);
  const Module = factory();
  return Module as T;
}

export type LoadRemoteModuleOptions = {
  remoteEntry: string;
  remoteName: string;
  exposedModule: string;
};

export async function loadRemoteModule<T = any>(
  options: LoadRemoteModuleOptions
): Promise<any> {
  await loadRemoteEntry(options.remoteEntry);
  return await lookupExposedRemote<T>(
    options.remoteName,
    options.exposedModule
  );
}
