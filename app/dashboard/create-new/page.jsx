"use client"
import React, { useContext } from 'react'
import ImageSelection from './_Components/imageSelection'
import RoomType from './_Components/RoomType'
import DesignType from './_Components/DesignType'
import AdditionalReq from './_Components/AdditionalReq'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/config/firebaseConfig'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import CustomLoading from './_Components/CustomLoading'
import AiOutputDialog from '../_components/AiOutputDialog'
import { Users } from 'lucide-react'
import { UserDetailContext } from '@/app/_context/UserDetailContext'

function CreateNew() {

  const {user} = useUser();
  const [formData, setFormData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [aiOutputImage, setAiOutputImage] = React.useState();
  const [openOutputDialog, setOpenOutputDialog] = React.useState(false);
  // const [outputResult, SetOutputResult] = React.useState();
  const [orgImage, setOrgImage] = React.useState();
  const {userDetail, setUserDetail}= useContext(UserDetailContext)
  const onHandleInputChange = (value, fieldName) => {
    setFormData(prev=>({
      ...prev,
      [fieldName]: value
    }))

    console.log(formData);
  }

  const GenrateAiImage = async()=>{
    setLoading(true);
    const rawImageUrl = await SaveRawImageToFirebase();
    const result = await axios.post('/api/redesign-room', {
      imageUrl: rawImageUrl,
      roomType:formData?.roomType,
      designType:formData?.designType,
      additionalReq:form?.additionalReq,
      userEmail: user?.primaryEmailAddress?.emailAddress
    });
    console.log(result.data);
    await updateUserCredits();

    setAiOutputImage(result.data.result);
    setOpenOutputDialog(true);
    setLoading(false);
  }
const SaveRawImageToFirebase=async()=>{
  //save raw file image to firebase
  const fileName=Date.now()+"_raw.png";
  const ImageRef = ref(storage,'room-redesign/'+fileName)
  await uploadBytes(ImageRef, formData.image).then(resp=>{
    console.log('File Uploaded.....')
  })

  //ulpaded file image url
  const downloadUrl = await getDownloadURL(ImageRef);
  console.log(downloadUrl);
  setOrgImage(downloadUrl)
  return downloadUrl;

}

/**
 * update the user  credits
 * @returns 
 */

const updateUserCredits = async()=>{
  const result = await db.update(Users).set({
    credits:userDetail?.credits-1
  }).returning({id:Users.id});

  if(result){
    setUserDetail(prev=>({
      ...prev,
      credits:userDetail?.credits-1
    }))
    return result[0].id
  }
}

  return (
    <div>
      <h2 className='font-bold text-3xl text-purple-600 text-center '>Experience the Magic of AI Remodeling</h2>
      <p className='text-center text-gray-500'>Transform any room with a click. Select a space, choose a style, and watch as AI instantly reimagines your environment.</p>

      <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10'>
        {/* image selction */}
        <ImageSelection selectedImage={(value) => onHandleInputChange(value, 'image')} />
        {/* form input section */}
        <div>
          {/* Room type */}
          <RoomType selectedRoomType={(value) => onHandleInputChange(value, 'roomType')} />
          {/* Design type */}

          <DesignType selectedDesignType={(value) => onHandleInputChange(value, 'designType')} />
          {/* Additional requirement text */}

          <AdditionalReq additionalRequirementInput={(value) => onHandleInputChange(value, 'additionalReq')} />
          {/* button to genrate image  */}


          <Button className="w-full mt-5 " onClick={GenrateAiImage}>Genrate</Button>
          <p className='text-sm text-gray-400 mb-52 '>NOTE: 1 Credit will use to redesign your room</p>
        </div>
      </div>
      <CustomLoading loading={loading}/>
      <AiOutputDialog openDialog={openOutputDialog} 
      closeDialog={()=>setOpenOutputDialog(false)} 
      orgImage={orgImage} 
      aiImage={aiOutputImage}
      />
    </div>
  )
}

export default CreateNew
