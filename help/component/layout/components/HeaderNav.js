import React from 'react'
import styled from 'styled-components'
import Link from 'next/link' ;
import { useRouter } from 'next/router';

const HeaderNav = () => {

    const Router = useRouter();

  return (
    <HeaderNavWrapper>
        
        <Link passHref href={'/'}> <HeaderNavLinks active={Router.pathname == "/" ? true : false}>
            FIR
            </HeaderNavLinks>
        </Link>
        {/* <Link passHref href={'/createfir'}> <HeaderNavLinks active={Router.pathname == "/createfir" ? true : false}>
                File FIR
            </HeaderNavLinks>
        </Link>     */}
        <Link passHref href={'/dashboard'}><HeaderNavLinks active={Router.pathname == "/dashboard" ? true : false}>
                Dashboard
            </HeaderNavLinks>  
        </Link>             


    </HeaderNavWrapper>
  )
}

const HeaderNavWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px;
    height: 50%;
    border-radius: 10px;
    /* border: 1px solid red; */
    text-decoration: none;
`
const HeaderNavLinks = styled.div`
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    font-family: sans-serif;
    margin: 5px;
    border-radius: 10px;
    padding: 0 5px 0 5px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 32px;
    color: #2f2f2f;
`

export default HeaderNav
