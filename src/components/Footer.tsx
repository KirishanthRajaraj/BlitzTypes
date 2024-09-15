import React from 'react'
import { Mail, Lock } from 'lucide-react';

const Footer = () => {
    return (
        <>
            <footer className='footer flex justify-between items-center py-8'>
                <div className='flex gap-3'>
                    <a className='flex gap-1 items-center text-sm ' href='mailto:kiricommercial@gmail.com'>
                        <Mail size={24} color="black" fill='white' />
                        <span className='hidden md:inline-block '>contact me</span>
                    </a>
                    <a className='flex gap-1 items-center text-sm ' href='/privacy-policy'>
                        <Lock size={20} color="white" />
                        <span className='hidden md:inline-block '>privacy policy</span>
                    </a>
                </div>
                <div className='flex-grow flex justify-center'>
                    <span className="text-sm text-muted-foreground">© Blitztypes 2024</span>
                </div>
                <span className='text-sm '>v1.0.0</span>
            </footer>
        </>
    )
}

export default Footer