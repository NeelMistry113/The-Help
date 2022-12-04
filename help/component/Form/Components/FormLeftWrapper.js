
import styled from 'styled-components'
import { FormState } from '../Form'
import { useContext } from 'react'

const FormLeftWrapper = () => {
    const Handler = useContext(FormState);

  return (
    <FormLeft>
      <FormInput>
        <label>DiFir Title</label>
        <Input onChange={Handler.FormHandler} value={Handler.form.firTitle}  placeholder='FIR Title' name='firTitle'>
        </Input>
      </FormInput>
      <FormInput>
        <label>DiFir Detail</label>
        <TextArea onChange={Handler.FormHandler} value={Handler.form.description}  placeholder='FIR Detail' name='description'>
        </TextArea>
      </FormInput>
    </FormLeft>
  )
}

const FormLeft = styled.div`
    /* border: 1px solid red; */
    width: 48%;
`

const FormInput = styled.div`
    display:flex ;
    flex-direction:column;
    font-family: sans-serif;
    margin-top:10px ;
    font-size: 24px;
`

const Input = styled.input`
    padding:15px;
    margin-top:4px;
    border:none ;
    border-radius:8px ;
    outline:none;
    font-size:large;
    width:100% ;
    font-family: sans-serif;
    background-color: #2f2f2f;
    color: #fef8ed;
    /* border: 1px solid red; */
`
const TextArea = styled.textarea`
    padding:15px;
    margin-top:4px;
    border:none ;
    border-radius:8px ;
    outline:none;
    font-size:x-large;
    font-family: sans-serif;
    width:100% ;
    background-color: #2f2f2f;
    color: #fef8ed;
    /* border: 1px solid red; */
    max-width: 100%;
    min-width: 100%;
    overflow-x:hidden;
    min-height: 350px ;
`
export default FormLeftWrapper
