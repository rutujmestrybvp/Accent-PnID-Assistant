import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import Anthropic from '@anthropic-ai/sdk'
import { functionDesc, mainInstructions } from '@/constants/prompts'
import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

const anthropic = new Anthropic({
  apiKey: process.env.API_KEY
})

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken, files } = json
  // console.log('Files printed here: ', files)
  // console.log(files.legend, files.input)
  // const userId = (await auth())?.user.id
  // console.log('userId', userId, 'previewToken', previewToken, 'files', files)

  const message = await anthropic.messages.create({
    model: 'claude-3-sonnet-20240229',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Image 1:'
          },
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: 'image/png',
              data: files.input
            }
          },
          {
            type: 'text',
            text: 'Image 2:'
          },
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: 'image/png',
              data: files.legend
            }
          },
          {
            type: 'text',
            text: messages[messages.length - 1].content || ''
          }
        ]
      }
    ]
  })

  // console.log(message.content)
  return new Response(message.content[0].text)

  // if (!userId) {
  //   return new Response('Unauthorized', {
  //     status: 401
  //   })
  // }

  // if (!files.input || !files.legend) {
  //   return new Response('Missing input or legend file', {
  //     status: 400
  //   })
  // }

  // if (previewToken) {
  //   openai.apiKey = previewToken
  // }

  // const lastMsg = messages[messages.length - 1].content

  // const myAssistant = await openai.beta.assistants.create({
  //   model: 'gpt-3.5-turbo-0125',
  //   instructions: mainInstructions,
  //   name: 'Data Analyst',
  //   tools: [
  //     { type: 'code_interpreter' },
  //     { type: 'retrieval' },
  //     ...functionDesc
  //   ],
  //   file_ids: [files.legend.id]
  // })

  // const myThread = await openai.beta.threads.create()
  // const myThreadMessage = await openai.beta.threads.messages.create(
  //   myThread.id,
  //   {
  //     role: 'user',
  //     // content: mainInstructions,
  //     content:
  //       lastMsg + '. (Instruction: always give the output in table format)',
  //     file_ids: [files.input.id]
  //   }
  // )
  // // console.log("This is the message object: ", myThreadMessage, "\n");

  // const myRun = await openai.beta.threads.runs.create(myThread.id, {
  //   assistant_id: myAssistant.id,
  //   instructions: mainInstructions
  // })

  // const retrieveRun = async () => {
  //   let keepRetrievingRun: any

  //   while (myRun.status !== 'completed') {
  //     keepRetrievingRun = await openai.beta.threads.runs.retrieve(
  //       myThread.id,
  //       myRun.id
  //     )

  //     if (keepRetrievingRun.status === 'queued') {
  //       console.log('Run status: queued')
  //       continue
  //     }

  //     let toolOutputs: any = []
  //     console.log(`Run status: ${keepRetrievingRun.status}`)

  //     if (keepRetrievingRun.status == 'requires_action') {
  //       if (keepRetrievingRun.status === 'queued') {
  //         console.log('Run status: queued')
  //         continue
  //       }
  //       console.log(
  //         'Run actions required. Preparing to call the required functions.'
  //       )
  //       const requiredActions: any =
  //         await keepRetrievingRun.required_action?.submit_tool_outputs

  //       for (let action of requiredActions.tool_calls) {
  //         toolOutputs.push({
  //           tool_call_id: action.id,
  //           output: true
  //         })
  //         console.log(toolOutputs)
  //       }

  //       await openai.beta.threads.runs.submitToolOutputs(
  //         myThread.id,
  //         myRun.id,
  //         {
  //           tool_outputs: toolOutputs
  //         }
  //       )
  //     }

  //     if (keepRetrievingRun.status === 'completed') {
  //       // console.log("\n");
  //       break
  //     }
  //   }
  // }
  // // await retrieveRun()

  // const waitForAssistantMessage = async () => {
  //   await retrieveRun()

  //   const allMessages: any = await openai.beta.threads.messages.list(
  //     myThread.id
  //   )

  //   return allMessages.data[0].content[0].text.value
  // }

  // let response = await waitForAssistantMessage()
  // console.log('This is the response: ', response)
  // // return response;
  // // const res = await openai.chat.completions.create({
  // //   model: 'gpt-3.5-turbo',
  // //   messages,
  // //   temperature: 0.7,
  // //   stream: true
  // // })

  // // const stream = OpenAIStream(res, {
  // //   async onCompletion(completion) {
  // //     const title = json.messages[0].content.substring(0, 100)
  // //     const id = json.id ?? nanoid()
  // //     const createdAt = Date.now()
  // //     const path = `/chat/${id}`
  // //     const payload = {
  // //       id,
  // //       title,
  // //       userId,
  // //       createdAt,
  // //       path,
  // //       messages: [
  // //         ...messages,
  // //         {
  // //           content: completion,
  // //           role: 'assistant'
  // //         }
  // //       ]
  // //     }
  // //     await kv.hmset(`chat:${id}`, payload)
  // //     await kv.zadd(`user:chat:${userId}`, {
  // //       score: createdAt,
  // //       member: `chat:${id}`
  // //     })
  // //   }
  // // })

  // // return chat message as response
  // return new Response(response)

  // return new StreamingTextResponse(stream)
}
