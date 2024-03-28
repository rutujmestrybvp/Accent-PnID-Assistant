import { NextResponse } from 'next/server'
// import { UploadFile } from "../../utils/OpenAI";
import OpenAI from 'openai'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: "test"//process.env.OPENAI_API_KEY
})

const UploadFile = async (fileSrc: any) => {
  const file = await openai.files.create({
    file: fileSrc,
    purpose: 'assistants'
  })
  return file
}

//create new thread
export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')

    let newFile = await UploadFile(file)

    return NextResponse.json(newFile)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
