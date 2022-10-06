
import { useColorSwitcher } from '../../styling/useColorSwitcher';
import { useLocation } from 'react-router-dom';
import MenuBtn from './MenuBtn';
import PatudoLogo from './PatudoLogo';

export default function Navbar({BGProps}) {

  const {colorState, switchColor} = useColorSwitcher();

  return (
  <div className={`navbar-holder`}>
    <nav className={`navbar ${colorState && `color${colorState}`}`}>

    <PatudoLogo switchColor={switchColor} appBGState={BGProps.appBGState}/>
    <MenuBtn BGProps={BGProps} />
    </nav>
    <div className={`navbar-edge1 ${colorState && `color${colorState}-st`}`}></div>
    <div className={`navbar-edge2 ${colorState && `color${colorState}-st2`}`}></div>
    <div className={`navbar-edge3 ${colorState && `color${colorState}-st3`}`}></div>
  </div>
  );
}
