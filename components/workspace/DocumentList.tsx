'use client'

import React from 'react'
import Image from 'next/image'
import { deleteDoc, doc, DocumentData } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { db } from '@/config/firebaseConfig'
import { toast } from 'sonner'
import DocumentOptions from './DocumentOptions'

type Props = {
  lists: DocumentData[]
  params: {
    documentId: string
    workspaceId: string
  }
}

const DocumentList = ({ lists, params }: Props) => {
  const router = useRouter();

  const deleteDocument = async (docId: string) => {
    await deleteDoc(doc(db, "workspaceDocuments", docId));
    toast.success('Document deleted successfully !')
  }

  return (
    <div>
      {lists.map((doc, index) => (
        <div key={index}
          onClick={() => router.push(`/workspace/${params.workspaceId}/${doc?.id}`)}
          className={`mt-3 p-2 px-3 hover:bg-gray-200 
            rounded-lg cursor-pointer flex justify-between items-center
            ${doc?.id == params?.documentId && 'bg-white'}
            `}>
          <div className='flex gap-2 items-center'>
            {!doc.emoji && <Image src={'/document.svg'} width={20} height={20} alt='Document Image' />}
            <h2 className='flex gap-2'> {doc?.emoji} {doc.documentName}</h2>
          </div>
          <DocumentOptions document={doc} deleteDocument={(docId) => deleteDocument(docId)} />
        </div>
      ))}
    </div>
  )
}

export default DocumentList