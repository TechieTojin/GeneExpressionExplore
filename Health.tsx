import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Health = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Health Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor and manage your overall health metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vital Signs</CardTitle>
            <CardDescription>Your current vital measurements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Heart Rate</span>
                <span className="font-medium">72 BPM</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Blood Pressure</span>
                <span className="font-medium">120/80 mmHg</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Temperature</span>
                <span className="font-medium">98.6°F</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Score</CardTitle>
            <CardDescription>Your overall health rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-health-primary">85</div>
              <p className="text-sm text-muted-foreground mt-2">Good</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest health activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Last Check-up</span>
                <span className="text-sm text-muted-foreground">2 weeks ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Medication Taken</span>
                <span className="text-sm text-muted-foreground">Today, 9:00 AM</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Water Intake</span>
                <span className="text-sm text-muted-foreground">1.5L today</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Health; 