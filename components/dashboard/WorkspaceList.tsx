'use client'
import React from 'react'
import { AlignLeft, LayoutGrid } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

const WorkspaceList = (props: Props) => {
  const { user } = useUser();

  const [workspaceList, setWorkspaceList] = React.useState([]);
  return (
    <div className='my-10 p-10 md:px-24 lg:px-36 xl:px-52'>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-2xl'>
          Hello, {user?.fullName} 👋
        </h2>

        <Link href={'/create-workspace'}>
          <Button size={'icon'}>
            +
          </Button>
        </Link>
      </div>

      <div className='mt-10 flex justify-between'>
        <div>
          <h2 className='font-medium text-primary'>Workspaces</h2>
        </div>

        <div className='flex gap-2'>
          <LayoutGrid />
          <AlignLeft />
        </div>

      </div>

      {workspaceList?.length === 0 ? (
        <div className='flex flex-col justify-center items-center my-10'>
          <Image
            src={'/workspace.svg'}
            alt='workspace'
            width={200}
            height={200}
          />

          <h2>
            Create a new workspace
          </h2>
          <Link href={'/create-workspace'}>
            <Button className='my-3'>
              + New Workspace
            </Button>
          </Link>
        </div>
      ) : (
        <div>

        </div>
      )
      }
    </div >
  )
}

export default WorkspaceList