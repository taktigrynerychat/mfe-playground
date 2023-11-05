import styled from 'styled-components';
import { useState } from 'react';

const StyledHeader = styled.header`
  background: #d8e7ff;
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 5px 15px;
  max-height: 60px;
  height: 60px;

  ul {
    list-style-type: none;
    display: flex;
    gap: 15px;
  }

  li {
    transition: .2s;
    cursor: pointer;
  }
  li:hover {
    color: #00549a;
    transform: scale(1.2);
  }
`;

const StyledLi = styled.li<{$isActive: boolean}>`
  text-decoration: ${props => (props.$isActive ? 'underline' : 'unset')};
`

const StyledLogo = styled.img`
  max-height: 100%;
`

interface Props {
  logoUrl: string;
  links: { title: string, link: string }[];
  navigationService: NavigationService
}
export function Header({ links, logoUrl, navigationService }: Props) {
  const [activeLink, setActiveLink] = useState(location.pathname.slice(1));
  const onLinkClick = (link: string): void => {
    navigationService.navigateTo([link]);
    setActiveLink(link);
  }

  return (
    <StyledHeader>
      <StyledLogo src={logoUrl} alt={'Logo'}/>
      <nav>
        <ul>
          { links.map(({link, title}) => (<StyledLi key={link} onClick={() => onLinkClick(link)} $isActive={activeLink === link}>{title}</StyledLi>)) }
        </ul>
      </nav>
    </StyledHeader>
  )
}
