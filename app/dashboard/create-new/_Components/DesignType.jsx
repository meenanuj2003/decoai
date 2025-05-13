import Image from 'next/image'
import React from 'react'

function DesignType({selectedDesignType}) {
    const Designs = [
        {
            name:'Modern',
            image:'/modernroom.png',
        },
        {
            name:'Industrial',
            image:'/industrialroom.png',
        },
        {
            name:'Bohemain',
            image:'/bohemainroom.png',
        },
        {
            name:'Traditional',
            image:'/traditionalroom.png',
        },
        {
            name:'Rustic',
            image:'/rusticroom.png',
        }
    ]

    const[selectedOption, setSelectedOption] = React.useState('')
  return (
    <div className='mt-5'>
      <label className='text-gray-500 '>Select INterrior Room Design Type</label>
      <div className='grid grid-cols-2 mt-3 md:grid-cols-3 lg:grid-cols-4 gap-5 '>
        {Designs.map((design,index)=>(
            <div key={index} onClick={()=>{setSelectedOption(design.name); selectedDesignType(design.name)}}>
                <Image alt='image' src={design.image} width={100} height={100} className={`h-[70px] rounded-md hover:scal-105 transition-all cursor-pointer ${design.name==selectedOption && 'border-2 border-primary rounded-md p-1'}`}/>
                <h2>{design.name}</h2>
            </div>
        ))}
      </div>
    </div>
  )
}

export default DesignType
