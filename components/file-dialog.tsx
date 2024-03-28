import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IconPlus } from './ui/icons'
import { cn } from '@/lib/utils'
import UploadFileForm from './files/upload-form'

export interface FileDialogProps {
  legendFile: File | null
  inputFile: File | null
  setLegendFile: (file: File | null) => void
  setInputFile: (file: File | null) => void
}

export function FileDialog({
  inputFile,
  legendFile,
  setLegendFile,
  setInputFile
}: FileDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            buttonVariants({ size: 'sm', variant: 'outline' }),
            'absolute left-0 top-4 size-8 rounded-full bg-background p-0 sm:left-4'
          )}
        >
          <IconPlus />
          <span className="sr-only">New Chat</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>Upload your PNID files</DialogDescription>
        </DialogHeader>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          File 1: <UploadFileForm setFile={setLegendFile} file={legendFile} />
          File 2: <UploadFileForm setFile={setInputFile} file={inputFile} />
          {/* <Label htmlFor="files">Legend</Label>
          {legendFile ? (
            <span>{legendFile.name}</span>
          ) : (
            <Input
              id="files"
              type="file"
              onChange={(e: any) => setLegendFile(e.target.files[0])}
            />
          )}
          <Label htmlFor="files">Input File</Label>
          {inputFile ? (
            <span>{inputFile.name}</span>
          ) : (
            <Input
              id="files"
              type="file"
              onChange={(e: any) => setInputFile(e.target.files[0])}
            />
          )} */}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
