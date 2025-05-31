import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Mental = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Mental Wellness</h1>
        <p className="text-muted-foreground">
          Track your mental health and mindfulness journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mood Tracker</CardTitle>
            <CardDescription>Your emotional well-being</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Today's Mood</span>
                  <span className="font-medium">Positive</span>
                </div>
                <Progress value={80} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Stress Level</span>
                  <span className="font-medium">Low</span>
                </div>
                <Progress value={30} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Energy Level</span>
                  <span className="font-medium">High</span>
                </div>
                <Progress value={85} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meditation Progress</CardTitle>
            <CardDescription>Your mindfulness practice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Today's Session</span>
                <span className="font-medium">15 minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Weekly Streak</span>
                <span className="font-medium">5 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Minutes</span>
                <span className="font-medium">120 minutes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sleep Quality</CardTitle>
            <CardDescription>Your rest and recovery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Last Night</span>
                  <span className="font-medium">7.5 hours</span>
                </div>
                <Progress value={85} />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Sleep Quality: Good</p>
                <p>Deep Sleep: 2.5 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Mental; 