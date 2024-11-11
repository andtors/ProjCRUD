'use client'

import React, { useEffect, useState } from 'react'
import { Template } from '../components'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


interface IUser{

    id: number,
    name: string,
    email: string
   
}

const page = () => {

    const [users, setUsers] = useState<IUser[]>([])
    const router = useRouter()

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
    }, [remove])


    function remove(id: any) {
         fetch(`http://localhost:8080/users/${id}`, {
            method: 'DELETE'
        })

    }

    function edit(id: any){
        router.push(`/user/${id}`)
    }

    return (
        <Template>
            <div className='border-2 px-10 py-10 border-none rounded-md shadow-2xl'>
                <div className='py-2 border-b-2 mb-4 border-green-400'>
                    <h1 className='text-2xl'>Contas registradas no sistema:</h1>
                </div>
                <div>
                    {users.length > 0 &&
                        users.map((user) => 
                            <div className='flex px-2 py-2 mb-5 rounded-md shadow-md' key={user.id}>
                                <div className='ms-4'>
                                    <p>Nome: {user.name}</p>
                                    <p>E-mail: {user.email}</p>
                                    
                                    <i onClick={e => remove(user.id)} className="pi pi-times"></i>
                                    <span className="pi pi-user" onClick={e => edit(user.id)}></span>
                                </div>
                            </div>
                        )}
                    <Link href='/auth'>
                        <button className='border-2 bg-green-400 border-none rounded-md py-2 px-2'>Cadastrar</button>
                    </Link>

                </div>
            </div>
        </Template>
    )
}

export default page

