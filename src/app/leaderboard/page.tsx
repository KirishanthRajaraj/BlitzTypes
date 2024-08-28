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
              <TableCell className="font-medium">{candidate.userName}</TableCell>
              <TableCell>{candidate.highScoreWPM} <span className='text-xs text-muted-foreground'>wpm</span></TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableCaption>&copy; Blitztypes 2024</TableCaption>

      </Table>

    </>
  )
}