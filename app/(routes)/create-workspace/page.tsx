'use client';

import CoverPicker from '@/components/shared/CoverPicker';
import EmojiPickerDialog from '@/components/shared/EmojiPickerDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SmilePlus } from 'lucide-react';
import Image from 'next/image'
import React from 'react'

const page = () => {
  const [coverImage, setCoverImage] = React.useState<string>('/cover.png')
  const [workspaceName, setWorkspaceName] = React.useState<string>()
  const [emoji, setEmoji] = React.useState<string>('')

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
            <Button disabled={!workspaceName}>
              Create
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