import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Fitness = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Fitness Dashboard</h1>
        <p className="text-muted-foreground">
          Track your fitness progress and workout routines
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Activity</CardTitle>
            <CardDescription>Your fitness progress today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Steps</span>
                  <span className="font-medium">6,543 / 10,000</span>
                </div>
                <Progress value={65} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Calories Burned</span>
                  <span className="font-medium">450 / 600</span>
                </div>
                <Progress value={75} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Active Minutes</span>
                  <span className="font-medium">45 / 60</span>
                </div>
                <Progress value={75} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Summary</CardTitle>
            <CardDescription>Your fitness achievements this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Workouts Completed</span>
                <span className="font-medium">4/5</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Distance</span>
                <span className="font-medium">12.5 km</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Calories</span>
                <span className="font-medium">2,450 kcal</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Workout</CardTitle>
            <CardDescription>Your scheduled workout</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Type</span>
                <span className="font-medium">HIIT Training</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Duration</span>
                <span className="font-medium">45 minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Time</span>
                <span className="font-medium">Tomorrow, 7:00 AM</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Fitness; 