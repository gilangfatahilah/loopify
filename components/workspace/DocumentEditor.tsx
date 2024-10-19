import React from 'react'
import DocumentHeader from './DocumentHeader'
import DocumentInfo from './DocumentInfo'

const DocumentEditor = ({ params }: { params: { workspaceId: string, documentId: string } }) => {

  return (
    <div>
      <DocumentHeader />
      <DocumentInfo params={params} />
    </div>
  )
}

export default DocumentEditor