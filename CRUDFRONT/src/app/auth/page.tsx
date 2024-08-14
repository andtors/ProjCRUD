'use client'

import { Template } from "@/app/components/Template"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"


const page = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const router = useRouter()

    function handleSubmit(e: React.FormEvent): void {
        e.preventDefault() 
        if(!email || !password || !name || !confirmPassword){
            return console.log('Insira todas as informações.')
        }

        if(password !== confirmPassword){
            return console.log("Senhas não batem.")
        }

        const userCredentials = {email, password, name, confirmPassword}
         try {
            
            fetch("http://localhost:8080/users", {
                method: 'POST',
                body: JSON.stringify(userCredentials),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            router.push('/home')

         } catch (error) {
            console.log(error)
         }
       
}

return (
    <Template>
        <div className="border-2 px-10 py-10 border-none rounded-md shadow-2xl">
            <h1 className="text-center text-xl font-bold mb-10">Registre uma conta</h1>
            <form onSubmit={handleSubmit}>

                <div className="mb-2">
                    <label>Seu nome</label>
                </div>

                <input name='name' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Nome" className="border-2 border-grey rounded-md py-1 px-2 mb-5" />

                <div className="mb-2">

                    <label>Seu e-mail</label>
                </div>

                <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="E-mail" className="border-2 border-grey rounded-md py-1 px-2 mb-5" />

                <div className="mb-2">
                    <label>Senha</label>
                </div>

                <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" className="border-2 border-grey rounded-md py-1 px-2 mb-5" />

                <div className="mb-2">
                    <label>Confirme sua senha</label>
                </div>

                <input name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="••••••••" className="border-2 border-grey rounded-md py-1 px-2 mb-5" />
                <div>
                    <button type="submit" className="bg-green-400 py-2 px-2 hover:bg-green-600 rounded-md mr-4">Cadastrar</button>
                    <Link href="/home">
                    <button className="bg-red-400 py-2 px-2 hover:bg-red-600 rounded-md mr-4" >Cancelar</button>
                    </Link>
                </div>
            </form>
        </div>
    </Template>
)
}

export default page