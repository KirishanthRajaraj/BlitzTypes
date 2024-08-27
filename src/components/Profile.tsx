import { getUser } from '@/client/User'
import React, { useEffect, useState } from 'react'
import { toast, useToast } from "./ui/use-toast"
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'
import { User } from '@/interfaces/User'
import * as Leaderboard from '@/client/leaderboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Button } from './ui/button'

export const UserProfile = () => {

  const { toast } = useToast()
  const [user, setUser] = useState<User>();
  const [candidates, setCandidates] = useState<User[]>([]);
  const [userRank, setUserRank] = useState<number>();

  // properties to show
  /*
    username
    joined at
    amount of tests started
    amount of seconds or hours or min typed
    edit bio?
    ----
    change username as option, maybe with request?
    ----
    preferred language
    preferred typing speed
    highscore (in every category?)
    date of highscore set?
    
  */

  useEffect(() => {
    getUserRanking();
  }, [candidates]);

  useEffect(() => {
    getUserData();
    getAllCandidates();
  }, []);


  const getUserRanking = () => {
    if (candidates && user) {
      candidates.forEach((candidate, index) => {

        if (candidate.id == user.id) {
          setUserRank(index + 1);
        }

      });
    }
  }

  const getUserData = async () => {
    let res;
    try {
      res = await getUser();
      setUser(res.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "something went wrong retrieving your user data",
      })
    }
  }

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
    <div>
      {user ? (
        <Card className="profile bg-gray-900 border-0 p-6">
          <div className="flex">
            <CardContent className='py-4 px-0 mb-4'>
              <div className="flex flex-col gap-4">

                <div className=''>
                  <div className="text-3xl font-extrabold flex gap-3">
                    <span>{user.userName}</span>
                    <Button variant="ghost"> <FontAwesomeIcon height={15} width={15} icon={faPen} /> </Button>
                  </div>
                </div>

                <div className="flex gap-12 items-end">
                  <div className='flex flex-col gap-2'>
                    <span className='opacity-60'>Ranking </span>
                    <span className=' text-4xl font-bold'>{userRank ? `#${userRank}` : "-"}</span>
                  </div>
                  <div className='flex flex-col gap-4'>
                    <span className='opacity-60'>Join Date</span>
                    <span className='font-bold'>{new Date(user.joinedDate).toLocaleDateString('en-GB').replace(/\//g, '.')}</span>
                  </div>
                  <div className='flex flex-col gap-4'>
                    <span className='opacity-60'>Email</span>
                    <span className='font-bold'>{user.email}</span>
                  </div>

                </div>
              </div>
            </CardContent>
          </div>
          <div className="flex gap-8 flex-wrap">
            <div>
              <h2 className='text-3xl font-bold pb-6'>
                Highscores
              </h2>
              <div className="flex flex-wrap gap-4">

                <Card className='bg-gray-800 border-none rounded-lg shadow-md shadow-black'>
                  <CardContent className=' p-4 pr-8'>
                    <CardDescription>15 seconds</CardDescription>
                    <CardTitle className="text-2xl">
                      {user.highScoreWPM_15_sec ? `${user.highScoreWPM_15_sec} wpm` : "-"}
                    </CardTitle>
                  </CardContent>
                </Card>
                <Card className='bg-gray-800 border-none rounded-lg shadow-md shadow-black'>
                  <CardContent className=' p-4 pr-8'>
                    <CardDescription>30 seconds</CardDescription>
                    <CardTitle className="text-2xl">
                      {user.highScoreWPM_30_sec ? `${user.highScoreWPM_30_sec} wpm` : "-"}
                    </CardTitle>
                  </CardContent>
                </Card>
                <Card className='bg-gray-800 border-none rounded-lg shadow-md shadow-black'>
                  <CardContent className=' p-4 pr-8'>
                    <CardDescription>60 seconds</CardDescription>
                    <CardTitle className="text-2xl">
                      {user.highScoreWPM_60_sec ? `${user.highScoreWPM_60_sec} wpm` : "-"}
                    </CardTitle>
                  </CardContent>
                </Card>
                <Card className='bg-gray-800 border-none rounded-lg shadow-md shadow-black'>
                  <CardContent className=' p-4 pr-8'>
                    <CardDescription>Accuracy</CardDescription>
                    <CardTitle className="text-2xl">
                      {user.highScoreAccuracy ? `${user.highScoreAccuracy} wpm` : "-"}
                    </CardTitle>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className='text-3xl font-bold pb-6'>
                Highscores
              </h2>
              <div className="flex gap-4">

                <Card className='bg-gray-800 border-none rounded-lg shadow-md shadow-black'>
                  <CardContent className=' p-4 pr-8'>
                    <CardDescription>time typed</CardDescription>
                    <CardTitle className="text-2xl">
                      {user.typingTime ? `${user.typingTime} min` : "-"}
                    </CardTitle>
                  </CardContent>
                </Card>
                <Card className='bg-gray-800 border-none rounded-lg shadow-md shadow-black'>
                  <CardContent className=' p-4 pr-8'>
                    <CardDescription>tests started</CardDescription>
                    <CardTitle className="text-2xl">
                      {user.testAmount ? `${user.testAmount}` : "-"}
                    </CardTitle>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div>User not found</div>
      )}
    </div>
  )
}