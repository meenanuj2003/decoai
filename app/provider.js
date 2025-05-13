"use client"
import { useUser } from '@clerk/nextjs'
import React, { use } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { UserDetailContext } from './_context/UserDetailContext'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
function Provider({children}) {

    const {user} = useUser();
    const [userDetail, setUserDetail] = React.useState([])
    useEffect(() => {
        user&&VerifyUser()
    },[user])

    /*
    verifyuser
    */
    const VerifyUser=async() => {
        const dataResult = await axios.post('/api/verify-user', {
            user: user
        });
        setUserDetail(dataResult.data.result);
        // console.log(dataResult.data)
    }
    console.log('UserDetailContext:', UserDetailContext);
    
  return (

    <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
      <PayPalScriptProvider options={{clientId:process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}}>
    <div>
      {children}
    </div>
    </PayPalScriptProvider>
    </UserDetailContext.Provider>
  )
}

export default Provider
