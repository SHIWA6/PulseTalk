import {Github, Twitter, Linkedin} from 'lucide-react'
import { Footer } from '../ui/footer'

function FooterComp() {

    return (
    <div className='w-full'> 
     <Footer
     brandName='PulseTalk'
        socialLinks={[ {
            icon: <Github/>, 
            href: "https://github.com/shiwa6",
            label: "GitHub"
        },
        {
            icon: <Twitter/>, 
            href: "https://twitter.com/techCricforlife", 
            label: "Twitter"}
    ]}
     mainLinks={[
        {href: "/", label: "About"},
        {href: "/", label: "Blog"},
        {href: "/", label: "Pricing"},
        {href: "/", label: "Products"},]}

     legalLinks={[
          { href: "/", label: "Privacy" },
          { href: "/", label: "Terms" },
        ]}
        copyright={{
          text: "© 2025 Pulsetalk",
          license: "All rights reserved",
        }}
      />
    </div>
  )
}

export { FooterComp }