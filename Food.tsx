import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Food = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Nutrition Dashboard</h1>
        <p className="text-muted-foreground">
          Track your nutrition and meal planning
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Nutrition</CardTitle>
            <CardDescription>Your daily nutrition goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Calories</span>
                  <span className="font-medium">1,450 / 2,000</span>
                </div>
                <Progress value={72} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Protein</span>
                  <span className="font-medium">65g / 80g</span>
                </div>
                <Progress value={81} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Carbs</span>
                  <span className="font-medium">180g / 250g</span>
                </div>
                <Progress value={72} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Fat</span>
                  <span className="font-medium">45g / 65g</span>
                </div>
                <Progress value={69} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meal Schedule</CardTitle>
            <CardDescription>Today's planned meals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Breakfast</span>
                <span className="text-sm text-muted-foreground">7:30 AM</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Lunch</span>
                <span className="text-sm text-muted-foreground">12:30 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Dinner</span>
                <span className="text-sm text-muted-foreground">6:30 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Snacks</span>
                <span className="text-sm text-muted-foreground">10:30 AM, 3:30 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Water Intake</CardTitle>
            <CardDescription>Daily hydration tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Water</span>
                  <span className="font-medium">1.5L / 2.5L</span>
                </div>
                <Progress value={60} />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Last drink: 30 minutes ago</p>
                <p>Next reminder: 15 minutes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Food; 