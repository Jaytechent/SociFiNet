
import { Menu, Transition } from "@headlessui/react";
import close from "/close.svg"
import Button from "../Elements/Button";
import MetaMask from "/MetaMask.svg";
import reload from "/reload.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function WalletDrop({
  disconnect,
  signIn,
  signOut,
  isSignedIn,
  truncatedAccount,
  balance,
}) {


  return (


<Menu
  
   

       as="div" className="relative inline-block text-left">
        <div >
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-gray-900 bg-white hover:bg-gray-100 border focus:ring-gray-100 font-medium  text-sm px-3 py-2 text-center items-center me-2 mb-2 " >
            <img
              className="mr-3"
              height={25}
              width={25}
              src={MetaMask}
              alt="My SVG"
            />
            {truncatedAccount}
          </Menu.Button>
        </div>

        <Transition
 
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
  <Menu.Items  className="absolute right-0 z-10 mt-2 w-96 h-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              
                
                  <div className="block px-4 py-2 text-sm ">
                    <div className="flex flex-row">
                      <img
                        className="inline-block p h-6 w-6 pt-3 pl-1 rounded-full ring-2 ring-white"
                        src={MetaMask}
                        alt=""
                      />
                      

                      <div className="ml-3 ">
                        <p className="text-sm font-medium text-gray-900">
                          {truncatedAccount}
                        </p>
                      </div>
                      <div className="flex ml-16 ">
                        {/* <div
                          className="ml-16 
                      "
                        >
                          <img
                            onClick={updateTriggerBoundingRect}
                            className="text-sm mr-3 mt-2 bg-blu font-medium text-gray-800"
                            height={20}
                            width={20}
                            src={reload}
                            alt="My SVG"
                          />
                        </div> */}
                        <div className="ml-6 mt-2 ">
                          <Button
                            onClick={disconnect}
                            className="text-sm font-medium font-sans uppercase  "
                            data-ripple-light="true"
                          >
                            disconnect
                          </Button>
                      
                        </div>
                      </div>
                    </div>
                  </div>
                  
           
              <hr class="my-1 mb-5 border-t-0 bg-neutral-200 dark:bg-white/10" />
        
               
                  <div className="group relative flex rounded-lg  ">
                    <div className="mt-1 flex h-2 w-5 flex-none rounded-lg bg-gray-50 "></div>

                    <div>
                      <p className="mt-1 leading-3 text-gray-600">Total Balance</p>
                      <p className=" -mt-1 font-extrabold  text-2xl text-gray-900">
                        {balance}
                        
                      </p>
                    </div>
                  </div>
           
              
              <hr class="mt-3  border-t-0 bg-neutral-200 dark:bg-white/10" />
              
          
                  <p className="block px-4  text-sm">
                  
                    <div className="flex flex-row-reverse items-center ">
  
                      
                    <Menu.Button
                    bordered 
                    
          type="primary"
         
          className="`text-white text-base bg-blue-600 text-center  px-2 pt-1 rounded-2xl shadow-[0_8px_10px_1px_rgba(51,78,255,0.4)] duration-300 hover:translate-y-0.5 transition-all hover:shadow-[0_8px_10px_1px_rgba(51,78,255,0.6)] "
          data-ripple-light="true "
         
          // onClick={}
        > <img src={close} height={20} width={20} alt="" /></Menu.Button>
                      {!isSignedIn ? (
                        <Button
                          onClick={signIn}
                          className="text-sm font-semibold text-gray-100 middle none center mr-2 rounded-lg bg-blue-400 py-1.5 hover:bg-blue-500 px-3 font-sans uppercase hover:shadow-sm hover:shadow-blue-500/40 focus:opacity-[0.85] "
                          data-ripple-light="true"
                        >
                          Sign in
                        </Button>
                      ) : (
                        <Button
                          onClick={signOut}
                          className="text-sm font-semibold text-gray-100 middle none center mr-2 rounded-lg bg-blue-400 py-1.5 hover:bg-blue-500 px-3 font-sans uppercase hover:shadow-sm hover:shadow-blue-500/40 focus:opacity-[0.85] "
                          data-ripple-light="true"
                        >
                          SignOut
                        </Button>
                      )}
                    </div>
                  </p>
           
                
              {/* <Menu.Item>
           
              <div className='flex'>
                  <div
                  class="scrollbar"
                  className="overflow-y-auto no-scrollbar relative top-0 left-0 w-96 h-96 bg-white shadow-lg ring-1 ring-black ring-opacity-5 hover:cursor-pointer overflow-x-hidden "
                
                  >
                    <div className='container'>

           
              {solutions.map((item) => (
                <div key={item.name} className="group relative flex gap-x-5 rounded-lg p-4 hover:bg-gray-50">
                  <div className="mt-1 flex h-2 w-5 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                  </div>
                  <div>
                    <a href={item.href} className="font-semibold text-gray-900">
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
              </div>
            </div>
            </div>
            

             
            
            </Menu.Item>   */}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

  );
}
