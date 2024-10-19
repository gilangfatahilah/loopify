import { DocumentData } from 'firebase/firestore'
import { Link2Icon, MoreVertical, PenBox, Trash2 } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

type Props = {
  document: DocumentData
  deleteDocument: (docId: string) => void
}

const DocumentOptions = ({ document, deleteDocument }: Props) => {
  return (
    <div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className='h-4 w-4' />
        </DropdownMenuTrigger>
        <DropdownMenuContent>

          <DropdownMenuItem className="flex gap-2">
            <Link2Icon className='h-4 w-4' /> Share Link</DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2">
            <PenBox className='h-4 w-4' />Rename</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => deleteDocument(document?.id)}
            className="flex gap-2 text-red-500">
            <Trash2 className='h-4 w-4' />Delete</DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  )
}

export default DocumentOptions