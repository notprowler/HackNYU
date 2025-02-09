import { AppHero } from '../ui/ui-layout'
import { useNavigate } from 'react-router'

// const links: { label: string; href: string }[] = [
//   { label: 'Solana Docs', href: 'https://docs.solana.com/' },
//   { label: 'Solana Faucet', href: 'https://faucet.solana.com/' },
//   { label: 'Solana Cookbook', href: 'https://solanacookbook.com/' },
//   { label: 'Solana Stack Overflow', href: 'https://solana.stackexchange.com/' },
//   { label: 'Solana Developers GitHub', href: 'https://github.com/solana-developers/' },
// ]

export default function DashboardFeature() {
  const navigate = useNavigate()

  return (
    <div>
      <AppHero title="Authenticity check" subtitle="Check if you're item is real or nah" />
      <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
        <div className="space-y-2">
          <p>I am...</p>
          <div className="flex justify-center w-full items-center space-x-4">
            <button onClick={() => navigate('/login')} className="btn btn-primary">
              Business
            </button>
            <button className="btn btn-primary">Customer</button>
          </div>
          {/* {links.map((link, index) => (
            <div key={index}>
              <a href={link.href} className="link" target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  )
}
