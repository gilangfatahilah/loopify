import SideNav from '@/components/workspace/SideNav'
import React from 'react'

const WorkspaceDocumentPage = ({ params }: { params: { documentId: string, workspaceId: string } }) => {

  return (
    <div>
      <div className=''>
        <SideNav params={params} />
      </div>

      <div className='ml-72'>
        <pre>
          {`${params.documentId}, - ${params.workspaceId}`}
        </pre>
      </div>
    </div>
  )
}

export default WorkspaceDocumentPage