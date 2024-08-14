'use client'

import React, { useEffect, useState } from 'react'
import { Template } from '../components'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


type Props = {}

const page = (props: Props) => {

    const [users, setUsers] = useState([])


    useEffect(() => {
        async function getAllUsers() {
            try {
                const response = await fetch("http://localhost:8080/users")

                response.json()
                    .then(U => setUsers(U))

            } catch (error) {
                console.log(error)
            }
        }

        getAllUsers()
    }, [])


    console.log(users)
    return (
        <Template>
            <div className='border-2 px-10 py-10 border-none rounded-md shadow-2xl'>
                <div className='border-2 px-2 py-2 mb-5 border-none rounded-md shadow-xl'>
                    <h1 className='text-2xl'>Contas registradas no sistema:</h1>
                </div>
                <div>
                    {users.length > 0 &&
                        users.map((user) => (
                            <div className='flex px-2 py-2 mb-5 rounded-md shadow-md' key={user.id}>
                                <div className='ms-4'>
                                    <p>Nome: {user.name}</p>
                                    <p>E-mail: {user.email}</p>
                                    <i className="pi pi-times"></i>
                                    <span className="pi pi-user"></span>
                                </div>
                            </div>
                        ))}
                        <Link href='/auth'>
                        <button className='border-2 bg-blue-500 border-none rounded-md py-2 px-2'>Cadastrar</button>
                        </Link>
                        
                </div>
            </div>
        </Template>
    )
}

export default page

