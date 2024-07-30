import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

interface Props {
    timerFinished: boolean;
    userWordCount: number;
}

const ResultPopup: React.FC<Props> = ({timerFinished, userWordCount}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(timerFinished === true){ 
            setOpen(true);
        } 
    }, [timerFinished]);

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen} >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                            <div className='test hello flex space-between'>
                                <div>
                                    ehloo
                                </div>
                                <div>
                                    helloo
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ResultPopup