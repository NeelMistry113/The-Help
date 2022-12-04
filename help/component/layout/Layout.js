import Header from "./Header"
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components'

const Wrapper = styled.div`
    background: #efdbde;
    height: 100vh;
    margin: 0;
`

const Layout = ({children}) => {
  return (
    <Wrapper>
        <Header/>
        {children}
    </Wrapper>
  )
}

export default Layout
