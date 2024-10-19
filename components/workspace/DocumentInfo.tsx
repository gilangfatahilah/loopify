'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import CoverPicker from '../shared/CoverPicker'
import EmojiPickerDialog from '../shared/EmojiPickerDialog'
import { SmilePlus } from 'lucide-react'
import { db } from '@/config/firebaseConfig'
import { doc, DocumentData, getDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'sonner'

type Props = {
  params: {
    workspaceId: string
    documentId: string
  }
}

const DocumentInfo = ({ params }: Props) => {
  const [coverImage, setCoverImage] = useState<string>('/cover.png')
  const [emoji, setEmoji] = useState<string>('')
  const [documentInfo, setDocumentInfo] = useState<DocumentData>()

  useEffect(() => {
    params && getDocumentInfo()
  }, [params])

  const getDocumentInfo = async () => {
    try {
      const documentReference = doc(db, 'workspaceDocuments', params.documentId);
      const documentSnapshot = await getDoc(documentReference);

      console.log(documentSnapshot.data())
      if (documentSnapshot.exists()) {
        const data = documentSnapshot.data();

        setDocumentInfo(data);
        setEmoji(data.emoji);
        data.coverImage && setCoverImage(data.coverImage);
      }
    } catch (error) {
      toast.error("Unexpected error occurred")
    }
  }

  const updateDocumentInfo = async (key: string, value: string) => {
    const documentReference = doc(db, 'workspaceDocuments', params.documentId);
    await updateDoc(documentReference, {
      [key]: value
    })
    toast.success('Document updated successfully !')
  }

  return (
    <div>
      <CoverPicker setCoverImage={setCoverImage} onCoverChange={(cover) => updateDocumentInfo('coverImage', cover)}>
        <div className='relative group cursor-pointer'>
          <h2 className='hidden absolute p-4 w-full h-full group-hover:flex items-center justify-center'>Change Cover</h2>
          <div className='group-hover:opacity-40'>
            <Image src={coverImage} alt='cover image'
              width={400}
              height={400}
              className='w-full h-[200px] object-cover rounded-t-xl'
            />
          </div>
        </div>
      </CoverPicker>

      <div className='absolute ml-10 mt-[-40px] cursor-pointer'>
        <EmojiPickerDialog setEmoji={setEmoji} onEmojiChange={(emoji) => updateDocumentInfo('emoji', emoji)}>
          <div className='bg-secondary/80 p-4 rounded-md'>
            {emoji?.length || emoji !== null
              ? <span className='text-5xl'>{emoji}</span>
              : <SmilePlus className='h-10 w-10 text-gray-500' />
            }
          </div>
        </EmojiPickerDialog>
      </div>

      <div className='mt-10 p-10'>
        <input
          type='text'
          className='font-bold text-4xl outline-none'
          placeholder='Document title'
          defaultValue={documentInfo?.documentName ?? 'Untitled Document'}
          onBlur={(e) => updateDocumentInfo('documentName', e.target.value)}
        />
      </div>
    </div>
  )
}

export default DocumentInfo