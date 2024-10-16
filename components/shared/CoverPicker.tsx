import React, { Dispatch, SetStateAction } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image';
import CoverOptions from './CoverOptions';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type Props = React.PropsWithChildren<{
  setCoverImage: Dispatch<SetStateAction<string>>
}>

const CoverPicker = ({
  children, setCoverImage
}: Props) => {
  const [selectedImage, setSelectedImage] = React.useState<string>('');

  return (
    <Dialog>
      <DialogTrigger className='w-full'>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Cover</DialogTitle>
          <DialogDescription>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3'>
              {CoverOptions.map((cover, index) => {
                return (<div key={index} onClick={() => setSelectedImage(cover.imageUrl)}
                  className={cn('p-1 rounded-md', {
                    'border-primary border-2': selectedImage === cover.imageUrl
                  })}>
                  <Image src={cover.imageUrl} alt='Cover Image' width={200} height={140} className='h-[70px] w-full rounded-md object-cover' />
                </div>)
              })}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button disabled={!selectedImage} type="button" onClick={() => setCoverImage(selectedImage)}>
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CoverPicker