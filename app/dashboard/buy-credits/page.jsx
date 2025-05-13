"use client"

import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button"
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Users } from "lucide-react";
import { useRouter } from "next/router";
import React, {useContext, useState} from "react"

function BuyCredits() {
    const creditsOption =[
        {
            credits: 5,
            amount: 0.99
        },
        {
            credits: 10,
            amount: 1.99
        },
        {
            credits: 25,
            amount: 3.99
        },
        {
            credits: 50,
            amount: 6.99
        }
       
    ]
    const [selectedOption, setSelectedOption] = useState([]);
    const [userDetail, setUserDetail] = useContext(UserDetailContext);
    const router = useRouter();
    const onPaymentSuccess=async()=>{
        console.log("payment success...")

        //update user credits in db
        const result = await db.update(Users).set({
            credits:userDetail?.credits+selectedOption?.credits

        }).returning({id:Users.id});

        if(result){
            setUserDetail(prev=>({
                ...prev,
                credits:userDetail?.credits+selectedOption?.credits
            }))
            router.push('/dashboard');
        }
    }
    return(
        <div>
            <h2 className="font-bold text-2xl">Buy More Credits</h2>
            <p>Unlock endless possibilities - Buy more credits and transformation</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {creditsOption.map((item, index)=>(

            <div className={`flex felx-col gap-2 justify-center items-center ${selectedOption?.credits==Item.credits && 'border-b-purple-800'} `}>

            <h2 className="font-bold text-3xl ">{Items.credits}</h2>
            <h2 className="font-medium text-purple-800 ">Credits</h2>

            <Button className="w-full" onClick={()=>setSelectedOption(Items)}>Select</Button>
            <h2 className="font-medium text-purple-800 ">${Item.amount}</h2>
            </div>
            ))}

            </div>

            <div className="mt-20 ">
                {selectedOption?.amount&&
                <PayPalButtons style={{layout: "horizontal"}}
                onApprove={()=>onPaymentSuccess()}
                onCancel={()=>console.log("Payment cancel")}
                createOrder={(data, actions) => {
                    return actions?.order.create({
                        purchase_units:[
                            {
                                amount: {
                                    value:selectedOption?.amount?.toFixed(2),
                                    currency_code: 'USD'
                                }
                            }
                        ]
                    })
                }}
                />
                }
            </div>
        </div>
    )
}