'use client'

import { Button } from '@nextui-org/button'
import { useDisclosure } from '@nextui-org/use-disclosure'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { SiGoogle, SiKakaotalk, SiNaver } from 'react-icons/si'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import { User } from '@nextui-org/user'
import { Skeleton } from '@nextui-org/skeleton'

export const LoginModal = () => {
  const { data: session, status } = useSession()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  if (status === 'loading') return <Skeleton className="flex rounded-full w-12 h-12" />

  return (
    <>
      {status === 'authenticated' ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <User
              as="button"
              name={session?.user?.name}
              description={session?.user?.email}
              avatarProps={{
                src: session?.user?.image ?? undefined
              }}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="settings">마이페이지</DropdownItem>
            <DropdownItem key="settings">계정설정</DropdownItem>
            <DropdownItem key="configurations">환결설정</DropdownItem>
            <DropdownItem key="help_and_feedback">도움 & 피드백</DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={() => signOut()}>
              로그아웃
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <>
          <Button onPress={onOpen} color="primary" variant="flat">
            로그인
          </Button>

          <Modal size="xs" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">로그인</ModalHeader>
                  <ModalBody>
                    <div className="w-full flex flex-col items-center gap-2">
                      <Button
                        color="success"
                        size="lg"
                        startContent={<SiNaver size={30} />}
                        className="w-[144px]"
                        onPress={() => signIn('naver')}
                      >
                        Naver
                      </Button>
                      <Button
                        color="warning"
                        size="lg"
                        startContent={<SiKakaotalk size={30} />}
                        className="w-[144px]"
                        onPress={() => signIn('kakao')}
                      >
                        Kakao
                      </Button>
                      <Button
                        size="lg"
                        startContent={<SiGoogle size={30} />}
                        className="w-[144px]"
                        onPress={() => signIn('google')}
                      >
                        Google
                      </Button>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      닫기
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  )
}
