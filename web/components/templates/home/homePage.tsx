/* eslint-disable @next/next/no-img-element */
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { StarIcon } from "@heroicons/react/20/solid";
import AdvancedAnalytics from "./AdvancedAnalytics";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { DEMO_EMAIL } from "../../../lib/constants";
import Details from "./detailsV2";
import BasePageV2 from "../../shared/layout/basePageV2";

import { createRef, SVGProps, useEffect, useRef, useState } from "react";
import OnboardingButton from "../../shared/auth/onboardingButton";
import {
  ArrowPathIcon,
  BanknotesIcon,
  ChevronRightIcon,
  CloudArrowDownIcon,
  CloudArrowUpIcon,
  CurrencyDollarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "../../shared/clsx";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import Logos from "./logos";
import {
  ChartPieIcon,
  CircleStackIcon,
  CloudIcon,
  CodeBracketIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import CodeSnippet from "./codeSnippet";
import LoginButton from "../../shared/auth/loginButton";
import { BsDiscord } from "react-icons/bs";
import NavBar from "../../shared/layout/navbar";
import Footer from "../../shared/layout/footer";
import NavBarV2 from "../../shared/layout/navBarV2";

const testimonials = [
  {
    body: `Keeping costs under control was a huge issue 2-3 weeks ago but we are now profitable per user.
        We leveraged a mix of caching, model-swapping, fine-tuning, and product updates to get here
        @helicone_ai has been a godsend for LLM cost analytics, especially cost/user`,
    author: {
      name: "Daniel Habib",
      handle: "DannyHabibs",
      imageUrl: "/assets/daniel-habib.png",
    },
  },

  {
    body: "My favourite of the new AI apps? @helicone_ai - Observability for @OpenAI is pretty bad. Hard to track bills and specific usage with native tools. I see Helicone as the next @datadoghq",
    author: {
      name: "John Ndege",
      handle: "johnndege",
      imageUrl: "/assets/john-ndege.png",
    },
  },
  {
    body: `I'm now using Helicone and it's a major QoL improvement while deving on LLMs

        Add one line to your python/JS OpenAI project and get
        - input/output logging
        - user-level metrics
        - caching (soon)
        
        Also OSS 👏`,
    author: {
      name: "Jay Hack",
      handle: "mathemagic1an",
      imageUrl: "/assets/jay-hack.png",
    },
  },
  {
    body: `As an early-stage startup, speed is everything at Trelent. Helicone helps us quickly understand user behaviour when we're iterating with OpenAI, shorten our testing cycles.`,
    author: {
      name: "Calum Bird",
      handle: "calumbirdo",
      imageUrl: "/assets/calum-bird.png",
    },
  },
  // More testimonials...
];

export default function HomePage() {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [demoLoading, setDemoLoading] = useState(false);
  if (!demoLoading && user?.email === DEMO_EMAIL) {
    supabaseClient.auth.signOut();
  }

  const observabilityDiv = useRef(null);
  const rateDiv = useRef(null);
  const bucketDiv = useRef(null);

  const [currentPanel, setCurrentPanel] = useState("observability");

  useEffect(() => {
    const observability = observabilityDiv.current;
    const rate = rateDiv.current;
    const bucket = bucketDiv.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentPanel(entry.target.id);
          }
        });
      },
      {
        threshold: 0,
      }
    );

    if (observability) {
      observer.observe(observability);
    }

    if (rate) {
      observer.observe(rate);
    }

    if (bucket) {
      observer.observe(bucket);
    }

    return () => {
      if (observability) {
        observer.unobserve(observability);
      }

      if (rate) {
        observer.unobserve(rate);
      }

      if (bucket) {
        observer.unobserve(bucket);
      }
    };
  }, []);

  return (
    <div className="flex-col w-full">
      <NavBarV2 />
      <div className="bg-gray-50 overflow-hidden">
        <div className="px-8 grid grid-cols-4 h-full max-w-7xl mx-auto border-r border-l border-gray-300 border-dashed w-full items-center justify-center">
          <div className="col-start-1 col-span-4 lg:col-span-2 space-y-12 h-[80vh] justify-center flex flex-col">
            <Link
              href="https://www.ycombinator.com/launches/I73-helicone-open-source-observability-platform-for-generative-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full w-fit bg-orange-600/10 px-3 py-1 text-sm font-semibold leading-6 text-orange-600 ring-1 ring-inset ring-orange-600/10"
            >
              Backed by Y Combinator
            </Link>
            <div className="text-5xl lg:text-[5rem] leading-none font-bold text-gray-900 text-left space-y-2">
              <p>Tooling for</p>
              <span className="bg-gradient-to-r from-sky-500 via-pink-500 to-violet-500 bg-[length:100%_7px] pb-2 bg-no-repeat bg-bottom">
                Generative AI
              </span>
            </div>
            <p className="text-xl leading-9 text-gray-700">
              Hundreds of organizations leverage Helicone to make their
              Large-Language Model operations more efficient.
            </p>
            <div className="flex flex-row gap-8">
              <OnboardingButton title={"Get Started"} />
              {demoLoading ? (
                <button className="flex flex-row underline underline-offset-2 font-semibold text-gray-900 items-center">
                  <ArrowPathIcon className="w-4 h-4 mr-1.5 animate-spin" />
                  Logging In...
                </button>
              ) : (
                <button
                  onClick={() => {
                    setDemoLoading(true);
                    supabaseClient.auth.signOut().then(() => {
                      supabaseClient.auth
                        .signInWithPassword({
                          email: DEMO_EMAIL,
                          password: "valyrdemo",
                        })
                        .then((res) => {
                          router.push("/demo").then(() => {
                            setDemoLoading(false);
                          });
                        });
                    });
                  }}
                  className="underline underline-offset-2 font-semibold text-gray-900"
                >
                  View Demo
                </button>
              )}
            </div>
          </div>
          <div className="hidden lg:flex mx-auto mt-16 max-w-2xl sm:mt-24 lg:ml-16 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-24">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  src="/assets/landing/preview.webp"
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="w-[60rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>

          <div className="col-span-4 grid grid-cols-4 gap-8 pb-32">
            {/* <img
              className="col-span-1 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
            <img
              className="col-span-1 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
            <img
              className="col-span-1 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
            <img
              className="col-span-1 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
            <img
              className="col-span-1 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />

            <img
              className="col-span-1 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
            <img
              className="col-span-1 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
            <img
              className="col-span-1 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            /> */}
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="px-8 pb-24 relative grid grid-cols-4 h-full max-w-7xl mx-auto border-r border-l border-gray-300 border-dashed w-full items-center justify-center">
          <div className="flex flex-col col-span-4 lg:col-span-2 space-y-8 py-32 lg:pr-32">
            <p className="text-lg text-sky-500 tracking-wide font-semibold">
              Real Time Metrics
            </p>
            <p className="text-5xl text-gray-900 font-semibold">
              Insights into your Usage and Performance
            </p>
            <div
              ref={observabilityDiv}
              id="observability"
              className="sr-only"
            />
            <p className="text-xl text-gray-700 font-normal leading-8">
              Building a Large-Language Model monitoring tool is time consuming
              and hard to scale. So we did it for you:
            </p>
            <ul className="flex flex-col space-y-4 list-disc ml-4 font-normal text-gray-700">
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-900 underline">
                    Monitor Spending:
                  </span>{" "}
                  Keep a close eye on your AI expenditure to control costs
                </p>
              </li>
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-900 underline">
                    Analyze Traffic Peaks:
                  </span>{" "}
                  Identify high-traffic periods to allocate resources more
                  efficiently
                </p>
              </li>
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-900 underline">
                    Track Latency Patterns:
                  </span>{" "}
                  Detect patterns in application speed and rectify slowdowns
                  proactively
                </p>
              </li>
            </ul>
          </div>
          <div className="flex-col hidden lg:flex col-span-2 h-full flex-1 sticky top-[5%] 2xl:top-[15%] py-28">
            <div className="h-full relative">
              <div
                className={clsx(
                  currentPanel === "observability"
                    ? "bg-sky-50 border-sky-500 text-sky-500"
                    : "bg-gray-50 border-gray-300 text-gray-500",
                  "h-[10%] w-[10%] z-10 shadow-sm border rounded-xl absolute top-0 flex items-center justify-center"
                )}
              >
                <ChartPieIcon className="h-8 w-8" />
              </div>
              <div
                className={clsx(
                  currentPanel === "rate"
                    ? "bg-pink-50 border-pink-500 text-pink-500"
                    : "bg-gray-50 border-gray-300 text-gray-500",
                  "h-[10%] w-[10%] z-10 shadow-sm border rounded-xl absolute top-1/3 right-0 flex items-center justify-center"
                )}
              >
                <UserGroupIcon className="h-8 w-8" />
              </div>
              <div
                className={clsx(
                  currentPanel === "bucket"
                    ? "bg-purple-50 border-purple-500 text-purple-500"
                    : "bg-gray-50 border-gray-300 text-gray-500",
                  "h-[10%] w-[10%] z-10 shadow-sm border rounded-xl absolute left-[10%] bottom-0 flex items-center justify-center"
                )}
              >
                <CodeBracketIcon className="h-8 w-8" />
              </div>
              <svg className="h-full w-full">
                {currentPanel === "observability" && (
                  <>
                    <line
                      x1="10%"
                      y1="5.5%"
                      x2="50%"
                      y2="5.5%"
                      stroke={"#0ea4e9"}
                      strokeWidth={1.25}
                    />
                    <line
                      x1="50%"
                      y1="5.5%"
                      x2="50%"
                      y2="20%"
                      stroke={"#0ea4e9"}
                      strokeWidth={1.25}
                    />
                  </>
                )}
                {currentPanel === "rate" && (
                  <>
                    <line
                      x1="95%"
                      y1="40%"
                      x2="95%"
                      y2="50%"
                      stroke="#ec489a"
                      strokeWidth={1.25}
                    />
                    <line
                      x1="95%"
                      y1="50%"
                      x2="85%"
                      y2="50%"
                      stroke="#ec489a"
                      strokeWidth={1.25}
                    />
                  </>
                )}
                {currentPanel === "bucket" && (
                  <>
                    <line
                      x1="15%"
                      y1="95%"
                      x2="50%"
                      y2="95%"
                      stroke="#a955f7"
                      strokeWidth={1.25}
                    />
                    <line
                      x1="50%"
                      y1="95%"
                      x2="50%"
                      y2="80%"
                      stroke="#a955f7"
                      strokeWidth={1.25}
                    />
                  </>
                )}
              </svg>
              <div
                className={clsx(
                  currentPanel === "observability" && "border-sky-500",
                  currentPanel === "rate" && "border-pink-500",
                  currentPanel === "bucket" && "border-purple-500",
                  "h-[70%] w-[70%] shadow-md border rounded-xl bg-white absolute top-0 bottom-0 left-0 right-0 m-auto p-4"
                )}
              >
                {currentPanel === "observability" && (
                  <div className="relative h-full">
                    <div className="p-6 w-56 bg-white border border-gray-300 rounded-lg space-y-2 absolute">
                      <div className="w-full flex flex-row items-center justify-between">
                        <div className="text-sm  text-gray-700">
                          Total Costs
                        </div>
                        {
                          <CurrencyDollarIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        }
                      </div>
                      <div className="text-2xl font-semibold">$432.24</div>
                    </div>
                    <div className="p-6 w-56 bg-white border border-gray-300 rounded-lg space-y-2 absolute top-[20%] right-0 z-10">
                      <div className="w-full flex flex-row items-center justify-between">
                        <div className="text-sm  text-gray-700">
                          Avg Latency / Req
                        </div>
                        {
                          <CloudArrowDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        }
                      </div>
                      <div className="text-2xl font-semibold">437.27 ms</div>
                    </div>
                    <div className="p-2 bottom-2 absolute rounded-lg border border-gray-300 mr-8">
                      <img
                        src="/assets/landing/requests.png"
                        alt="requests-graph"
                      />
                    </div>
                  </div>
                )}
                {currentPanel === "rate" && (
                  <div className="h-full flex flex-col space-y-4">
                    <div className="w-full font-semibold text-gray-900 grid grid-cols-8 divide-x divide-gray-300 px-2 border-b border-gray-300 pb-1">
                      <p className="col-span-2">User</p>
                      <p className="col-span-3 pl-4">Total Cost</p>
                      <p className="col-span-3 pl-4">Avg Req / Day</p>
                    </div>
                    <ul className="space-y-4">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <li key={i}>
                          <ul className="w-full grid grid-cols-8 px-1">
                            <li className="bg-gray-400 rounded-lg h-6 w-12 col-span-2" />
                            <li className="bg-gray-400 rounded-lg h-6 w-16 col-span-3 ml-2" />
                            <li className="bg-gray-400 rounded-lg h-6 w-16 col-span-3 ml-2" />
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {currentPanel === "bucket" && (
                  <div className="relative h-full">
                    <div className="p-6 w-56 z-10 bg-white border border-gray-300 rounded-lg right-0 space-y-2 absolute">
                      <div className="w-full flex flex-row items-center justify-between">
                        <div className="text-sm  text-gray-700">
                          Total Saved
                        </div>
                        {
                          <BanknotesIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        }
                      </div>
                      <div className="text-2xl font-semibold">$146.21</div>
                    </div>
                    <div className="p-2 left-0 top-[15%] absolute rounded-lg border border-gray-300">
                      <img
                        src="/assets/landing/piechart.png"
                        alt="pie-chart"
                        className="h-56 w-56"
                      />
                    </div>
                    <div className="p-4 h-40 w-56 bg-white border border-gray-300 rounded-lg flex flex-col space-y-4 absolute bottom-0 right-0">
                      <div className="flex flex-row space-x-2">
                        <div className="bg-gray-400 rounded-md h-4 w-12" />
                        <div className="bg-gray-400 rounded-md h-4 w-12" />
                        <div className="bg-gray-400 rounded-md h-4 w-8" />
                      </div>
                      <div className="flex flex-row space-x-2">
                        <div className="bg-gray-400 rounded-md h-4 w-8" />
                        <div className="bg-gray-400 rounded-md h-4 w-20" />
                      </div>
                      <div className="flex flex-row space-x-2">
                        <div className="bg-gray-400 rounded-md h-4 w-12" />
                        <div className="bg-gray-400 rounded-md h-4 w-20" />
                        <div className="bg-gray-400 rounded-md h-4 w-8" />
                      </div>
                      <div className="flex flex-row space-x-2">
                        <div className="bg-gray-400 rounded-md h-4 w-16" />
                        <div className="bg-gray-400 rounded-md h-4 w-24" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col col-span-4 lg:col-span-2 space-y-8 py-32 lg:pr-32">
            <p className="text-lg text-pink-500 tracking-wide font-semibold">
              User Management Tools
            </p>
            <p className="text-5xl text-gray-900 font-semibold">
              Easily manage your application&apos;s users
            </p>
            <div ref={rateDiv} id="rate" className="sr-only" />
            <p className="text-xl text-gray-700 font-normal leading-8">
              Our intuitive user management tools offer a hassle-free way to
              control access to your system.
            </p>
            <ul className="flex flex-col space-y-4 list-disc ml-4 font-normal text-gray-700">
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-900 underline">
                    User Rate Limiting:
                  </span>{" "}
                  Limit the number of requests per user to prevent abuse
                </p>
              </li>
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-900 underline">
                    User Metrics:
                  </span>{" "}
                  Identify power users and optimize your application for them
                </p>
              </li>
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-900 underline">
                    Request Retries:
                  </span>{" "}
                  Automatically retry failed requests to ensure users
                  aren&apos;t left in the dark
                </p>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-4 col-span-4 py-32 lg:pr-32">
            <div className="col-span-4 lg:col-span-2 space-y-8">
              <p className="text-lg text-purple-500 tracking-wide font-semibold">
                Tooling for LLMs
              </p>
              <p className="text-5xl text-gray-900 font-semibold">
                Tools to scale your LLM-powered application
              </p>
              <div ref={bucketDiv} id="bucket" className="sr-only" />
              <p className="text-xl text-gray-700 font-normal leading-8">
                Our toolkit provides an array of features to manage and control
                your AI applications.
              </p>
              <ul className="flex flex-col space-y-4 list-disc ml-4 font-normal text-gray-700">
                <li>
                  <p className="leading-7">
                    <span className="font-semibold text-gray-900 underline">
                      Bucket Cache:
                    </span>{" "}
                    Save money by caching and configuring responses
                  </p>
                </li>
                <li>
                  <p className="leading-7">
                    <span className="font-semibold text-gray-900 underline">
                      Custom Properties:
                    </span>{" "}
                    Tag requests to easily segment and analyze your traffic
                  </p>
                </li>
                <li>
                  <p className="leading-7">
                    <span className="font-semibold text-gray-900 underline">
                      Streaming Support:
                    </span>{" "}
                    Get analytics into streamed responses out of the box
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0a2540] h-full">
        <div className="px-8 pb-16 relative grid grid-cols-4 h-full max-w-7xl mx-auto border-r border-l border-gray-400 border-dashed w-full items-center justify-center">
          <div className="col-span-4 lg:col-span-2 flex flex-col space-y-12 py-32 lg:pr-32">
            <p className="text-lg text-sky-400 tracking-wide font-semibold">
              Made By Developers, For Developers
            </p>
            <p className="text-5xl text-white font-semibold">
              Simple and Flexible Integration
            </p>
            <p className="text-xl text-gray-300 font-normal leading-8">
              Our solution is designed to seamlessly integrate with your
              existing setup:
            </p>
            <ul className="flex flex-col space-y-4 list-disc ml-4 font-normal text-gray-300">
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-100 underline">
                    Effortless Setup:
                  </span>{" "}
                  Get started with only 2 lines of code
                </p>
              </li>
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-100 underline">
                    Versatile Support:
                  </span>{" "}
                  Our platform smoothly integrates with your preferred tool
                </p>
              </li>
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-100 underline">
                    Package Variety:
                  </span>{" "}
                  Choose from a wide range of packages to import
                </p>
              </li>
            </ul>
            <div>
              <Link
                href="https://docs.helicone.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-sky-400 font-semibold text-gray-900 rounded-xl"
              >
                Read Our Docs
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex flex-col col-span-4 lg:col-span-2 h-full py-32 space-y-4">
            <CodeSnippet variant={"themed"} />
          </div>
        </div>
      </div>
      <div className="bg-gray-50">
        <div className="px-8 grid grid-cols-4 gap-24 h-full max-w-7xl mx-auto border-r border-l border-gray-300 border-dashed w-full items-center justify-center">
          <div className="col-span-4 lg:col-span-2 flex flex-col space-y-8 py-32">
            <p className="text-4xl text-sky-500 tracking-wide font-semibold">
              Open Source
            </p>
            <p className="text-2xl text-gray-900 font-semibold">
              Open-source is more than a choice—it&apos;s a commitment to
              user-centric development, community collaboration, and absolute
              transparency.
            </p>
            <div className="flex flex-row gap-8 items-center">
              <Link
                href="https://github.com/Helicone/helicone"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800 font-semibold text-white rounded-xl"
              >
                Star us on GitHub
              </Link>
              <Link
                href="/roadmap"
                className="underline underline-offset-2 font-semibold text-gray-900"
              >
                View Roadmap
              </Link>
            </div>
          </div>
          <div className="flex flex-col col-span-2 lg:col-span-1 h-full py-32 space-y-4">
            <div className="flex flex-col space-y-2">
              <CloudIcon className="h-8 w-8 inline text-sky-500" />
              <p className="text-gray-900 font-semibold text-lg">
                Cloud Solution
              </p>
            </div>
            <p className="text-gray-500">
              We offer a fully-managed cloud solution, allowing you to focus on
              what matters most.
            </p>
            <div>
              <Link
                href="/pricing"
                className="underline underline-offset-2 font-semibold text-gray-900"
              >
                View Pricing
              </Link>
            </div>
          </div>
          <div className="flex flex-col col-span-2 lg:col-span-1 h-full py-32 space-y-4">
            <div className="flex flex-col space-y-2">
              <CloudArrowUpIcon className="h-8 w-8 inline text-sky-500" />
              <p className="text-gray-900 font-semibold text-lg">AWS Deploy</p>
            </div>
            <p className="text-gray-500">
              Deploy your own instance of Helicone on AWS, with just a few
              clicks.
            </p>
            <div>
              <Link
                href="https://docs.helicone.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 font-semibold text-gray-900"
              >
                View Docs
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-violet-200 h-full">
        <div className="px-8 grid grid-cols-4 h-full max-w-7xl mx-auto border-r border-l border-gray-400 border-dashed w-full text-center items-center justify-center">
          <div className="col-span-4 flex flex-col space-y-8 py-32">
            <p className="text-4xl text-violet-900 tracking-wide font-semibold">
              Join Our Community
            </p>
            <p className="text-2xl text-gray-700 font-medium">
              We&apos;re always looking for new contributors to help us improve
            </p>
            <div className="flex flex-row gap-8 w-full justify-center">
              <Link
                href="https://discord.gg/zsSTcH2qhG"
                target="_blank"
                rel="noreferrer noopener"
                className="px-4 py-2 bg-gray-800 font-semibold text-white rounded-xl"
              >
                Join Discord
              </Link>
            </div>
          </div>
          <section className="col-span-4">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
              <div className="mx-auto grid gap-4 max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
                {testimonials.map((testimonial, i) => (
                  <div
                    key={i}
                    className="bg-violet-100 shadow-sm flex flex-col p-8 rounded-xl space-y-4 h-full justify-between"
                  >
                    <blockquote className="text-sm leading-6">
                      <p>{`“${testimonial.body}”`}</p>
                    </blockquote>
                    <figcaption className="flex items-center gap-x-4 w-fit">
                      <img
                        className="h-10 w-10 flex-none rounded-full bg-gray-50"
                        src={testimonial.author.imageUrl}
                        alt=""
                      />
                      <div className="flex-auto text-left">
                        <div className="font-semibold">
                          {testimonial.author.name}
                        </div>
                        <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
                      </div>
                    </figcaption>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
