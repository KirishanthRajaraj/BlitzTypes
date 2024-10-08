'use client';
import { LoginForm } from '@/components/LoginForm';
import React, { useEffect, useState } from 'react'
import * as Leaderboard from '@/client/leaderboard';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from '@/components/ui/use-toast';

export default function Login() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    getAllCandidates();

  }, [])

  const getAllCandidates = async () => {
    let res: any;
    try {
      res = await Leaderboard.getAllCandidates();
      setCandidates(res.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error fetching Leaderboard Candidates",
        description: error.response.data.error,
      })
      console.log(error);
    }
    return res.data;
  }

  return (
    <>
      <h1 className='text-4xl mb-12 font-bold'>Leaderboards</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Username</TableHead>
            <TableHead>Highscore</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">


                <div className='flex flex-col align-end '>
                  <div className='text-lg'>
                    {candidate.userName}
                  </div>

                  {candidate.title && (
                    <div
                      className={`${candidate.titleStyles}`}
                    >                    
                    {candidate.title}
                    </div>
                  )}

                </div>
              </TableCell>
              <TableCell>
                {candidate.highScoreWPM} <span className='text-xs text-muted-foreground'>wpm</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>

      <p className='text-sm mt-12 text-muted-foreground'>
        Want to appear in the leaderboards? Register <a href='/register' className='underline hover:text-white duration-300'>here</a> and start typing
      </p>

    </>
  )
}