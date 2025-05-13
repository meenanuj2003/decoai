import { AiGenratedImage } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { uploadString } from "firebase/storage";
import RenderResult from "next/dist/server/render-result";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN
});

export async function POST(req) {

    // const {user} = useUser();

    const { imageUrl, roomType, designType, additionalReq, userEmail } = await req.json()

    //convert image to ai image
    try {
        const input = {
            image: imageUrl,
            prompt: 'A ' + roomType + ' with a ' + designType + ' style interior ' + additionalReq
        };

        // const output = await replicate.run("adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38", { input });
        // await writeFile("output.png", output);
        // return NextResponse.json({ result: output })

        const output = "https://replicate.delivery/pbxt/ErBV2UBauT4005ZKg0ZljGgkSPGH1F9SvK9FLUX3tjZmjQ6E/out.png";


        //convert output url to BASE64 Image
        const  base64Image = await ConvertImageToBase64(output);


        //save base64 to firebase
        const fileName = Date.now() + '.png';
        const storageRef = ref(storage, 'room-redesign/' + fileName);
        await uploadString(storageRef, base64Image, 'data_url');
        const downloadUrl = await getDownloadURL(storageRef);
        console.log(downloadUrl);

        //save all to database
        const dbResult = await db.insert(AiGenratedImage).values({
            roomType: roomType,
            designType: designType,
            orgImage: imageUrl,
            aiImage: downloadUrl,
            userEmail: userEmail
        }) .returning({id: AiGenratedImage.id});

        console.log(dbResult);
        return NextResponse.json({ 'result' : downloadUrl })


    }
    catch (e) {
        return NextResponse.json({ error: e })
    }

}

async function ConvertImageToBase64(imageUrl){
    const resp = await axios.get(imageUrl, {respinseType: 'arraybuffer'});
    const base64ImageRaw = Buffer.from(resp.data).toString('base64');

    return "data:image/png;base64,"+ base64ImageRaw;
}