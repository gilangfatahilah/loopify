'use client'

import React, { useEffect, useState } from 'react'
import Logo from '../shared/Logo'
import { Bell, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { collection, onSnapshot, query, where, DocumentData, doc, setDoc } from 'firebase/firestore'
import { db } from '@/config/firebaseConfig'
import { useUser } from '@clerk/nextjs'
import DocumentList from './DocumentList'
import uuid4 from 'uuid4'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Progress } from '../ui/progress'

const MAX_FILE: number = 20;

const SideNav = ({ params }: { params: { documentId: string, workspaceId: string } }) => {
  const { user } = useUser()
  const router = useRouter();
  const [documentList, setDocumentList] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    params && getDocumentList();
  }, [params])

  const getDocumentList = () => {
    const q = query(collection(db, 'workspaceDocuments'), where('workspaceId', '==', Number(params.workspaceId)));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setDocumentList([]);

      querySnapshot.forEach((doc) => {
        setDocumentList(documentList => [...documentList, doc.data()])
      })
    })
  }

  const createNewDocument = async () => {
    try {
      setLoading(true);
      if (documentList.length === MAX_FILE) {
        toast.warning('You have reached the maximum file capacity !')
        return;
      }

      const docId = uuid4();

      await setDoc(doc(db, 'workspaceDocuments', docId.toString()), {
        workspaceId: Number(params.workspaceId),
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

      router.replace(`/workspace/${params.workspaceId}/${docId}`)
    } catch (error) {
      toast.error('Unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-screen md:w-72 hidden md:block fixed bg-blue-50 p-5 shadow-md'>
      <div className='flex justify-between items-center'>
        <Logo />
        <Bell className='w-5 h-5 text-gray-500' />
      </div>
      <hr className='my-5' />

      <div>
        <div className='flex justify-between items-center'>
          <h2 className='font-medium'>Workspace Name</h2>
          <Button size={'sm'} className='text-lg' onClick={createNewDocument}>
            {loading ? <Loader2 className='animate-spin w-4 h-4' /> : '+'}
          </Button>
        </div>
      </div>

      <DocumentList lists={documentList} params={params} />

      <div className='absolute bottom-10 w-[85%]'>
        <Progress value={(documentList.length / MAX_FILE) * 100} />
        <h2 className='text-sm font-light my-2'>
          <strong>{documentList.length}</strong> Out of <strong>{MAX_FILE}</strong> files used.
        </h2>
        <h2 className='text-sm font-light'>
          Upgrade your plan for unlimited access.
        </h2>
      </div>
    </div>
  )
}

export default SideNav