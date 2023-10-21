import { Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import NextLink from 'next/link'
import { LoginModal } from './login-modal'
import { Image } from '@nextui-org/image'
export const Navbar = () => {
  return (
    <NextUINavbar>
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <NextLink href="/">
            <Image src="/logo.png" width={50} height={50} alt="logo" />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <NextLink href="/">
            <Image src="/logo.png" width={50} height={50} alt="logo" />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <LoginModal />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  )
}
