/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { IconCheck } from '../ui/icons'
import { Button } from '../ui/button'

export default function UploadFileForm(props: any) {
  let { setFile, file } = props

  const [localFile, setLocalFile] = React.useState<any>(null)

  //file logic
  function handleOnChangeFile(e: any) {
    const target = e.target.files[0]
    setLocalFile(target)
  }

  function base64Url(file: any) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64String = reader.result as string
        const base64WithoutPrefix = base64String.split(',')[1]
        resolve(base64WithoutPrefix)
      }
      reader.onerror = error => reject(error)
      reader.readAsDataURL(file)
    })
  }

  //handle upload the file to open ai
  const handleFileUpload = async (e: any) => {
    e.preventDefault()

    if (localFile) {
      let fileData = new FormData()
      fileData.append('file', localFile)
      let url = await base64Url(localFile)
      console.log('base64', url)
      // setLocalFile(url)
      setFile(url)
      console.log('file', localFile)

      console.log('fileData', fileData)
      // send formdata to testupload route post
      // fetch('/api/files/testupload', {
      //   method: 'POST',
      //   body: fileData
      // })
      //   .then(res => res.json())
      //   .then(data => {
      //     console.log('data', data)
      //     setFile(data)
      //   })
      //   .catch(err => {
      //     console.log('err', err)
      //   })
    }
  }

  return (
    <form onSubmit={handleFileUpload} className="upload-file">
      {file ? (
        <span>{file.filename}</span>
      ) : (
        <div className="form-upload flex">
          <div className="uploading-box">
            {/* <p className="upload-text">Upload File (PDF/CSV)</p> */}
            <input
              className="upload-file-input"
              id="file"
              type="file"
              name="file"
              onChange={handleOnChangeFile}
            />
          </div>

          <Button type="submit" variant={'secondary'}>
            <IconCheck />
          </Button>
        </div>
      )}
    </form>
  )
}
