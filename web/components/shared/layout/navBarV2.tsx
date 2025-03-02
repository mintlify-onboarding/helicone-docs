/* eslint-disable @next/next/no-img-element */
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  BanknotesIcon,
  Bars3Icon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { Fragment, useState } from "react";
import OnboardingButton from "../auth/onboardingButton";
import { SocialMeta } from "./basePageV2";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import LoginButton from "../auth/loginButton";

interface NavBarV2Props {}

const NavBarV2 = (props: NavBarV2Props) => {
  const {} = props;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  return (
    <header className="bg-gray-50 top-0 sticky z-50 border-b border-gray-200">
      <nav
        className="mx-auto flex max-w-7xl items-center gap-x-16 p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Helicone</span>
            {/* 1324 × 364 */}
            <Image
              className="block rounded-xl"
              src="/assets/landing/helicone.webp"
              width={150}
              height={150 / (1876 / 528)}
              alt="Helicone-full-logo"
            />
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-16 items-center">
          <Link href="/pricing" className="text-md font-semibold text-gray-900">
            Pricing
          </Link>
          <Link
            href="https://docs.helicone.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-md font-semibold text-gray-900"
          >
            Documentation
          </Link>
          <Link href="/roadmap" className="text-md font-semibold text-gray-900">
            Roadmap
          </Link>
          <Link
            href="https://github.com/Helicone/helicone"
            target="_blank"
            rel="noopener noreferrer"
            className="text-md font-semibold text-gray-900"
          >
            Github
          </Link>
        </div>
        <div className="flex-1 hidden lg:flex items-center justify-end gap-x-4">
          {user ? (
            <button
              onClick={() => {
                supabaseClient.auth.signOut().then(() => {
                  router.push("/");
                });
              }}
              className="px-4 py-2 border border-gray-900 font-semibold text-gray-900 rounded-xl"
            >
              Sign Out
            </button>
          ) : (
            <LoginButton />
          )}
        </div>
        <div className="flex flex-1 justify-end lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-50 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex flex-col gap-10 h-full">
            <div>
              <div className="flex items-center gap-x-6 justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Helicone</span>
                  <Image
                    className="block rounded-md"
                    src="/assets/landing/helicone.webp"
                    width={150}
                    height={150 / (1876 / 528)}
                    alt="Helicone-full-logo"
                  />
                </a>

                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6">
                  <div className="py-6 flex flex-col space-y-8">
                    <Link
                      href="/pricing"
                      className="text-md font-semibold text-gray-900"
                    >
                      Pricing
                    </Link>
                    <Link
                      href="https://docs.helicone.ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-md font-semibold text-gray-900"
                    >
                      Documentation
                    </Link>
                    <Link
                      href="/roadmap"
                      className="text-md font-semibold text-gray-900"
                    >
                      Roadmap
                    </Link>
                    <Link
                      href="https://github.com/Helicone/helicone"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-md font-semibold text-gray-900"
                    >
                      Github
                    </Link>
                  </div>
                  {user ? (
                    <button
                      onClick={() => {
                        supabaseClient.auth.signOut().then(() => {
                          router.push("/");
                        });
                      }}
                      className="px-4 py-2 border border-gray-900 font-semibold text-gray-900 rounded-xl"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <LoginButton />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default NavBarV2;
