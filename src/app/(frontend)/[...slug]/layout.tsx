// import '../(frontend)/styles/global.scss'
// import { Header } from '../(frontend)/components/Header'
// import { Footer } from '../(frontend)/components/Footer'

export const metadata = {
  title: 'Mitbewohner',
  description: 'Base layout',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      {/* <div className="">testpage</div> */}
    
    </div>
  )
}
