'use client'

import { Select, SelectItem } from '@nextui-org/select'
import { User } from 'next-auth'
import { Chip } from '@nextui-org/chip'
import { Avatar } from '@nextui-org/avatar'
import React from 'react'

interface SelectUserProps {
  data: User[]
  label: string
  state: any
  setState: any
}

export const SelectUser: React.FC<SelectUserProps> = ({ data, label, state, setState }) => {
  return (
    <Select
      items={data}
      label={label}
      variant="flat"
      selectedKeys={state}
      onSelectionChange={setState}
      isMultiline={true}
      selectionMode={'single'}
      placeholder="유저 선택"
      color={label === 'team1' ? 'primary' : 'danger'}
      classNames={{
        base: 'max-w-xs'
      }}
      renderValue={(items) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={`select-${label}-${item.data?.id}`} variant={'flat'} radius={'sm'}>
                {item.data?.name}
              </Chip>
            ))}
          </div>
        )
      }}
    >
      {(user) => (
        <SelectItem key={user.id} textValue={user.name ?? ''}>
          <div className="flex gap-2 items-center">
            <Avatar alt={user.name ?? ''} className="flex-shrink-0" size="sm" src={user.image ?? ''} />
            <div className="flex flex-col">
              <span className="text-small">{user.name}</span>
              <span className="text-tiny text-default-400">{user.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  )
}
