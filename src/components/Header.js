import React from 'react'
export default function Header() {

  return (
    <header className="text-gray-600 body-font mb-3 bg-blue-300">
      <div className="container mx-auto flex flex-wrap p-1 flex-col md:flex-row items-center">
        <a href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src="./logo.png" alt="Main logo" height="60px" width="60px"></img>
          <span className="ml-3 text-xl">Restaurant Search</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">

        </nav>
      </div>
    </header>
    )
}
