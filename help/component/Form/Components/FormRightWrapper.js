import styled from "styled-components"
import { FormState } from "../Form"
import { useContext, useState } from "react"
import { toast } from 'react-toastify';
import {TailSpin} from 'react-loader-spinner'
import {create as IPFSHTTPClient} from 'ipfs-http-client';

const projectId = process.env.NEXT_PUBLIC_IPFS_ID
const projectSecret = process.env.NEXT_PUBLIC_IPFS_KEY
const auth = 'Basic ' + Buffer.from(projectId + ":" + projectSecret).toString('base64')

const client = IPFSHTTPClient({
    host:'ipfs.infura.io',
    port:5001,
    protocol: 'https',
    headers: {
      authorization: auth
    }
  })


const FormRightWrapper = () => {

    const Handler = useContext(FormState);

    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);

  const uploadFiles = async (e) => {
    e.preventDefault();
    setUploadLoading(true);

    if(Handler.form.story !== "") {
      try {
        const added = await client.add(Handler.form.story);
        Handler.setStoryUrl(added.path)
      } catch (error) {
        toast.warn(`Error Uploading Story`);
      }
    }

      if(Handler.image !== null) {
          try {
              const added = await client.add(Handler.image);
              Handler.setImageUrl(added.path)
          } catch (error) {
            toast.warn(`Error Uploading Image`);
          }
      }

      if(Handler.firLivingAddress !== "") {
        try {
            const added = await client.add(Handler.firLivingAddress);
            Handler.setFirLivingAddress(added.path)
        } catch (error) {
          toast.warn(`Error Uploading firLivingAddress`);
        }
    }

    if(Handler.firContactNumber !== "") {
      try {
          const added = await client.add(Handler.firContactNumber);
          Handler.setFirContactNumber(added.path)
      } catch (error) {
        toast.warn(`Error Uploading firContactNumber`);
      }
  }

  if(Handler.firVictimName !== "") {
    try {
        const added = await client.add(Handler.firVictimName);
        Handler.setFirVictimName(added.path)
    } catch (error) {
      toast.warn(`Error Uploading firVictimName`);
    }
}

      setUploadLoading(false);
      setUploaded(true);
      Handler.setUploaded(true);
      toast.success("Files Uploaded Sucessfully")
    }

  return (
    <FormRight>
      <FormInput>
        <FormRow>
            <RowFirstInput>
                <label>Phone Number</label>
                <Input onChange={Handler.FormHandler} value={Handler.form.contactNumber} name='contactNumber' placeholder="Enter your Conntect Number"></Input>
            </RowFirstInput>
            <RowFirstInput>
                <label>Victim Name</label>
                <Input onChange={Handler.FormHandler} value={Handler.form.victimname} name='victimname' placeholder="Enter your Conntect Number"></Input>
            </RowFirstInput>
            <RowSecondInput>
                <label>Current Address</label>
                <TextArea onChange={Handler.FormHandler} value={Handler.form.currentAddress} name='currentAddress' placeholder="Enter your Current Addresss"></TextArea>
            </RowSecondInput>
        </FormRow>
      </FormInput>

      {/* imgae */}
      {/* <FormInput>
        <label>Provide proof of Bulling</label>
        <Image alt="dapp" onChange={Handler.ImageHandler} type={'file'} accept='image/*'>
        </Image>
      </FormInput> */}
      {uploadLoading == true ? <Button><TailSpin color='#fff' height={20} /></Button> :
        uploaded == false ? 
        <Button onClick={uploadFiles}>
          Upload the data
        </Button>
        : <Button style={{cursor: "no-drop"}}>Files uploaded Sucessfully</Button>
      }

      {/* Button */}
    
    <Button onClick={Handler.startCampaign}>
        Submit DiFIR
    </Button>

    </FormRight>
  )
}

const FormRight = styled.div`
    width: 45%;
`
const FormInput = styled.div`
    display:flex ;
    flex-direction:column;
    font-family:sans-serif;
    margin-top:10px ;
    font-size: 24px;
`
const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  font-family: sans-serif;
  width:100% ;
`

const Input = styled.input`
    padding:15px;
    margin-top:4px;
    border:none ;
    border-radius:8px ;
    outline:none;
    font-size:large;
    width:100% ;
    background-color: #2f2f2f;
    color: #fef8ed;
    flex-wrap: wrap;
    font-family: sans-serif;
    margin-top: 16px;
` 
const TextArea = styled.textarea`
    padding:15px;
    margin-top:4px;
    border:none ;
    border-radius:8px ;
    outline:none;
    font-size:x-large;
    font-family:sans-serif;
    width:100% ;
    background-color: #2f2f2f;
    color: #fef8ed;
    /* border: 1px solid red; */
    max-width: 100%;
    min-width: 100%;
    overflow-x:hidden;
    min-height:150px ;
`

const RowFirstInput = styled.div`
  display:flex ;
  flex-direction:column ;
  width:45% ;
  margin-top: 12px;
`
const RowSecondInput = styled.div`
  display:flex ;
  flex-direction:column ;
  width:45% ;
  margin-top: 18px;
`

const Image = styled.input`
  background-color:${(props) => props.theme.bgDiv} ;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none ;
  border-radius:8px ;
  outline:none;
  font-size:large;
  width:100% ;

  &::-webkit-file-upload-button {
    padding: 15px ;
    background-color: ${(props) => props.theme.bgSubDiv} ;
    color: ${(props) => props.theme.color} ;
    outline:none ;
    border:none ;
    font-weight:bold ;
  }  
`


const Button = styled.button`
    display: flex;
    justify-content: center;
    width: 50%;
    padding: 15px;
    color: #2f2f2f ;
    background-color:#00b712 ;
    background-image:
        linear-gradient(180deg, #00b712 0%, #5aff15 80%) ;
    border:none;
    margin-top:30px ;
    cursor: pointer;
    font-weight:bold ;
    font-size:large;
    border-radius: 32px;
`
export default FormRightWrapper
