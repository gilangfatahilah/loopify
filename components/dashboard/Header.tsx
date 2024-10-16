'use client'
import { OrganizationSwitcher, useAuth, UserButton } from '@clerk/nextjs'
import Logo from '../shared/Logo'
import React from 'react'

type Props = {}

const Header = (props: Props) => {
  const { orgId } = useAuth();

  return (
    <header className='flex justify-between items-center p-3 shadow-sm'>
      <Logo />
      <OrganizationSwitcher
        afterCreateOrganizationUrl='/dashboard'
        afterLeaveOrganizationUrl='/dashboard'
      />
      <UserButton />
    </header>
  )
}

export default Header