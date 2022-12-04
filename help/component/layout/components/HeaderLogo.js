import styled from 'styled-components';
import { help } from './help.png'
function HeaderLogo() {
  return (
    <Logo>
      {/* <img src="./help.png"  alt="Help" /> */}
    </Logo>
  )
}

const Logo = styled.div`
  width: 56px;
  height: 100%;
  overflow: hidden;
  padding-left: 16px;
  /* border: 1px solid black; */
  background-image: url("./logo.jpeg");
  background-repeat: no-repeat;
  background-size: cover;

`

export default HeaderLogo
