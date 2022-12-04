import styled from "styled-components"
import FormLeftWrapper from "./Components/FormLeftWrapper"
import FormRightWrapper from "./Components/FormRightWrapper"
import { createContext, useState } from "react"
import {TailSpin } from 'react-loader-spinner';
import { ethers } from "ethers";
import {toast} from 'react-toastify';
import FirFactory from '../../artifacts/contracts/DiFir.sol/FirFactory.json'

const FormState = createContext();

const Form = () => {
 
    const [form, setForm] = useState({
        firTitle: "",
        description: "",
        victimname: "",
        contactNumber: "",
        currentAddress: "",

    });

    const [loading, setLoading] =useState(false);
    const [address, setAddress] = useState("");
    const [uploaded, setUploaded] = useState(false);

    const [storyUrl, setStoryUrl] = useState();
    const [imageUrl, setImageUrl] = useState();

    const [firTitle , setFirTitle] = useState();
    const [firLivingAddress , setFirLivingAddress] = useState();
    const [firContactNumber, setFirContactNumber] = useState();
    const [firVictimName, setFirVictimName] = useState();


    const FormHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const [image, setImage] = useState(null);

    const ImageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const startCampaign = async (e) => {
        e.preventDefault();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
        if(form.campaignTitle === "") {
          toast.warn("Title Field Is Empty");
        } else if(form.story === "" ) {
          toast.warn("Story Field Is Empty");
        } else if(form.requiredAmount === "") {
          toast.warn("Required Amount Field Is Empty");
        } else if(uploaded == false) {
            toast.warn("Files Upload Required")
        }
        else {        
          setLoading(true);  
    
          const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_ADDRESS,
            FirFactory.abi,
            signer
          );

          const campaignData = await contract.createFir(
            form.firTitle ?? "",
            storyUrl ?? "",
            firLivingAddress ?? "",
            firContactNumber ?? "",
            firVictimName?? "",
            imageUrl ?? ""                                                                  
          );
          await campaignData.wait();   
    
          setAddress(campaignData.to);
          }
        }

  return (
    <FormState.Provider value={{form, setForm, image, setImage, ImageHandler, FormHandler , setImageUrl, setStoryUrl, setUploaded, startCampaign, firTitle }}>
        <FormWrapper>
            <FormMain>
                {/* <FormTitle>
                    File The DiFIR
                </FormTitle> */}
                {loading == true ?
                    address !== "" ?
                        <Spinner>
                            <TailSpin height={60}/>
                        </Spinner> :
                    <Address>
                        <h1>DiFIR Submited Sucessfully!</h1>
                        <h1>{address}</h1>
                        <Button>
                            Go To FILE FIR
                        </Button>
                    </Address>
                    :
                    <FormInputswrapper>
                        <FormLeftWrapper/>
                        <FormRightWrapper/>
                    </FormInputswrapper>
                }
            </FormMain>
        </FormWrapper>
    </FormState.Provider>
  )
}

const FormWrapper = styled.div`
    width: 100%;
        display:flex;
        justify-content:center;
        /* border: 1px solid red; */
`
const FormMain = styled.div`
    width: 80%; 
`

const FormTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: capitalize;
    font-weight: bold;
    font-size: 40px;
    font-family: 'poppines';
    margin-top: 20px;
    /* border: 1px solid red; */
`

const FormInputswrapper = styled.div`
    display: flex;
    /* border: 1px solid red; */
    justify-content: space-between;
    margin-top: 42px;
`

const Spinner = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    justify-content:center ;
    align-items:center ;
`

const Address = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    display:flex ;
    flex-direction:column;
    align-items:center ;
    background-color: #2f2f2f;
    border-radius:8px;
`

const Button = styled.button`
    display: flex;
  justify-content:center;
  width:30% ;
  padding:15px ;
  color:white ;
  background-color:#00b712 ;
  background-image:
      linear-gradient(180deg, #00b712 0%, #5aff15 80%) ;
  border:none;
  margin-top:30px ;
  cursor: pointer;
  font-weight:bold ;
  font-size:large ;
`
export default Form;
export {FormState};
