'use client';

import CoverPicker from '@/components/shared/CoverPicker';
import EmojiPickerDialog from '@/components/shared/EmojiPickerDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/config/firebaseConfig';
import { useAuth, useUser } from '@clerk/nextjs';
import { doc, setDoc } from 'firebase/firestore';
import { Loader2, SmilePlus } from 'lucide-react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import uuid4 from 'uuid4'

const page = () => {
  const router = useRouter()
  const { user } = useUser();
  const { orgId } = useAuth();
  const [coverImage, setCoverImage] = React.useState<string>('/cover.png')
  const [workspaceName, setWorkspaceName] = React.useState<string>()
  const [emoji, setEmoji] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)

  const onCreateWorkspace = async () => {
    try {
      setLoading(true)

      const workspaceId = Date.now();
      const docId = uuid4();

      await setDoc(doc(db, 'Workspace', workspaceId.toString()), {
        workspaceName: workspaceName,
        emoji: emoji,
        coverImage: coverImage,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        id: workspaceId,
        orgId: orgId ? orgId : user?.primaryEmailAddress?.emailAddress
      });

      await setDoc(doc(db, 'workspaceDocuments', docId.toString()), {
        workspaceId: workspaceId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        coverImage: null,
        emoji: null,
        id: docId,
        documentName: 'Untitled Document',
        documentOutput: []
      })

      await setDoc(doc(db, 'documentOutput', docId.toString()), {
        docId: docId,
        output: []
      })

      toast.success('Successfully created workspace!')
      router.replace(`/workspace/${workspaceId}/${docId}`);
    } catch (error) {
      console.log(error)
      toast.error('Unexpected error occurred!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-10 md:px-36 lg:px-64 xl:px-96 py-28'>
      <div className='shadow-2xl rounded-xl'>

        <CoverPicker setCoverImage={setCoverImage}>
          <div className='relative group cursor-pointer'>
            <h2 className='hidden absolute p-4 w-full h-full group-hover:flex items-center justify-center'>Change Cover</h2>
            <div className='group-hover:opacity-40'>
              <Image src={coverImage} alt='cover image'
                width={400}
                height={400}
                className='w-full h-[150px] object-cover rounded-t-xl'
              />
            </div>
          </div>
        </CoverPicker>

        <div className='p-12'>
          <h2 className='font-medium text-xl'>Create new workspace</h2>
          <h2 className='mt-2 text-sm'>This is a shared space where you can collaborate with your team.
            You can always rename it later.
          </h2>
          <div className='mt-8 flex gap-2 items-center'>
            <EmojiPickerDialog setEmoji={setEmoji}>
              <Button variant={'outline'}>
                {emoji.length ? emoji : <SmilePlus />}
              </Button>
            </EmojiPickerDialog>
            <Input placeholder='Workspace Name' onChange={(e) => setWorkspaceName(e.target.value)} />
          </div>
          <div className='mt-7 flex gap-2 items-center justify-end'>
            <Button disabled={!workspaceName || loading} onClick={onCreateWorkspace}>
              Create {loading && <Loader2 className='animate-spin ml-2' />}
            </Button>
            <Button variant={'outline'}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page