"use client"
import {motion,Variants } from 'framer-motion';


interface AccordionItemProps{
    title: string
    content: string
    isExpended: boolean
    onToggle: ()=> void
}

interface AccordionProps{
    items:Array<{
        title:string
        content:string
    }>
}

const AccordionItem: React.FC<AccordionItemProps> = ({
    title,
    content,
    isExpended,
    onToggle,
}) => {
    const cardVarients: Variants = {
        collapsed : {
            height: "60px",
            transition: {
                type: 'spring',
                stiffness:300,
                damping: 15
            }
        },
        expanded: {
      height: 'auto',
      transition: { type: 'spring', stiffness: 300, damping: 15 },
    },
    }

    const contentVariants: Variants = {
        collapsed: { opacity:0},
        expanded:{
            opacity:1,
            transition: {
                delay:0.1
            },
        }}

        const chevronVarients: Variants = {
            collapsed: { rotate:0},
            expanded: {
                rotate:180
            },
        }

        return(
            <motion.div className='my-4 cursor-pointer select-none overflow-hidden rounded-lg border dark:border-gray-700'></motion.div>
        )
    }




export { AccordionComp}