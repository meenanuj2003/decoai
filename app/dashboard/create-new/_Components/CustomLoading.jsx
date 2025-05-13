import Image from 'next/image';
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function CustomLoading({loading}) {
    return (
        <AlertDialog open={loading}>

            <AlertDialogContent>
                 <AlertDialogTitle className="sr-only">Room Redesign In Progress</AlertDialogTitle>
                <div className='bg-white flex flex-col items-center my-10 justify-center'>
                    <Image src={'/loading.png'} alt='loading' width={100} height={100}/>
                    <h2>Redesigning your Room ... Do not Refresh </h2>
                </div>

            </AlertDialogContent>
        </AlertDialog>

    )
}

export default CustomLoading
