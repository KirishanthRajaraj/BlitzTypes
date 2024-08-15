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
    <main className="flex min-h-screen flex-col p-24">
      <h1 className='text-4xl mb-12'>Leaderboards</h1>

      <Table>
      <TableCaption>&copy; Blitztypes 2024</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Username</TableHead>
          <TableHead>Highscore</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {candidates.map((candidate) => (
          <TableRow key={candidate.invoice}>
            <TableCell className="font-medium">{candidate.userName}</TableCell>
            <TableCell>{candidate.highScoreWPM}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    
    </main>
  )
}