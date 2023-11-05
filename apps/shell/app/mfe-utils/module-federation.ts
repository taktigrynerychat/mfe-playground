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

/**
 * Loads a remote entry asynchronously and resolves with a boolean indicating success.
 * @param remoteEntry - The URL of the remote entry script to load.
 * @returns A Promise that resolves with a boolean indicating success.
 */
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
      resolve(moduleMap[remoteEntry]);
    };

    document.body.append(script);
  });
}

/**
 * Looks up an exposed remote module by remote name and module name.
 * @param remoteName - The name of the remote container.
 * @param exposedModule - The name of the exposed module to look up.
 * @returns A Promise that resolves with the retrieved module.
 */
async function lookupExposedRemote<T>(
  remoteName: string,
  exposedModule: string
): Promise<T> {
  // Initializes the shared scope. Fills it with known provided modules from this build and all remotes
  await __webpack_init_sharing__('default');
  const container: Container = window[remoteName]; // or get the container somewhere else

  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(exposedModule);
  const Module = factory();
  return Module as T;
}

/**
 * Represents options for loading a remote module.
 */
export type LoadRemoteModuleOptions = {
  remoteEntry: string;
  remoteName: string;
  exposedModule: string;
};

/**
 * Loads a remote module using the provided options.
 * @param options - The options for loading the remote module.
 * @returns A Promise that resolves with the loaded module.
 */
export async function loadRemoteModule<T = any>(
  options: LoadRemoteModuleOptions
): Promise<any> {
  await loadRemoteEntry(options.remoteEntry);
  return await lookupExposedRemote<T>(
    options.remoteName,
    options.exposedModule
  );
}

/**
 * Represents metadata for a federation plugin, including remote module loading options and the element name.
 */
export interface FederationPluginMetadata extends LoadRemoteModuleOptions {
  element: string
}

