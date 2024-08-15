'use client'

interface TemplateProps {
    loading?: boolean
    children: React.ReactNode
}

interface MainSection {
    children: React.ReactNode
}


export const Template: React.FC<TemplateProps> = ({ children }: TemplateProps) => {
    return (
        <div>
           
            <Header />
            <MainSection>
                {children}
            </MainSection>
            <Footer />
        </div>
    )
}

export const Footer: React.FC = () => {
    return (
        <footer className="bg-green-600 text-white py-4 fixed bottom-0 w-screen " >
            <div className=" text-center ">
                Desenvolvido por André Torres
            </div>
        </footer>
    )
}

export const Header: React.FC = () => {

    return (
        <header className="bg-green-600 text-white py-4 px-4 shadow-xl fixed top-0 w-screen">
            <div className="flex justify between items-center">
                <div className="container flex justify between ">
                    <p className="text-3xl">CRUD com Spring</p>
                </div>
            </div>
        </header>
    )
}

export const MainSection: React.FC<MainSection> = ({ children }: MainSection) => {
    return (
        <div className="h-screen flex items-center justify-center">
            {children}
        </div>
    )
}