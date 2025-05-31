import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { Search, TrendingUp, AlertTriangle, Lightbulb, Brain, Activity, ChevronRight, AlertCircle, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

// Mock data for AI insights
const mockData = {
  predictions: {
    cardiovascular: {
      diseaseTrends: [
        { month: 'Jan', predicted: 120, actual: 115, risk: 75 },
        { month: 'Feb', predicted: 125, actual: 122, risk: 78 },
        { month: 'Mar', predicted: 130, actual: 128, risk: 80 },
        { month: 'Apr', predicted: 135, actual: 132, risk: 82 },
        { month: 'May', predicted: 140, actual: 138, risk: 85 },
        { month: 'Jun', predicted: 145, actual: 142, risk: 88 },
      ],
      riskFactors: [
        { factor: 'Blood Pressure', impact: 90, trend: 'Increasing' },
        { factor: 'Cholesterol', impact: 85, trend: 'Stable' },
        { factor: 'Lifestyle', impact: 80, trend: 'Improving' },
        { factor: 'Age', impact: 75, trend: 'Stable' },
        { factor: 'Genetics', impact: 70, trend: 'Stable' },
      ],
      treatmentEffectiveness: [
        { treatment: 'Statins', effectiveness: 92, adoption: 85 },
        { treatment: 'Blood Pressure Meds', effectiveness: 88, adoption: 80 },
        { treatment: 'Lifestyle Changes', effectiveness: 85, adoption: 75 },
        { treatment: 'Surgical Options', effectiveness: 82, adoption: 60 },
        { treatment: 'Alternative Therapy', effectiveness: 65, adoption: 45 },
      ],
      regionalImpact: [
        { region: 'North', cases: 150, mortality: 12, recovery: 88 },
        { region: 'South', cases: 180, mortality: 15, recovery: 85 },
        { region: 'East', cases: 120, mortality: 10, recovery: 90 },
        { region: 'West', cases: 140, mortality: 11, recovery: 89 },
      ],
    },
    neurological: {
      diseaseTrends: [
        { month: 'Jan', predicted: 80, actual: 75, risk: 85 },
        { month: 'Feb', predicted: 85, actual: 82, risk: 87 },
        { month: 'Mar', predicted: 90, actual: 88, risk: 88 },
        { month: 'Apr', predicted: 95, actual: 92, risk: 90 },
        { month: 'May', predicted: 100, actual: 98, risk: 92 },
        { month: 'Jun', predicted: 105, actual: 102, risk: 93 },
      ],
      riskFactors: [
        { factor: 'Cognitive Decline', impact: 95, trend: 'Increasing' },
        { factor: 'Genetic Markers', impact: 90, trend: 'Stable' },
        { factor: 'Environmental', impact: 75, trend: 'Variable' },
        { factor: 'Age', impact: 85, trend: 'Increasing' },
        { factor: 'Lifestyle', impact: 70, trend: 'Improving' },
      ],
      treatmentEffectiveness: [
        { treatment: 'Cognitive Therapy', effectiveness: 85, adoption: 70 },
        { treatment: 'Medication', effectiveness: 80, adoption: 75 },
        { treatment: 'Lifestyle Modifications', effectiveness: 75, adoption: 65 },
        { treatment: 'Stem Cell Therapy', effectiveness: 70, adoption: 40 },
        { treatment: 'Alternative Approaches', effectiveness: 60, adoption: 35 },
      ],
      regionalImpact: [
        { region: 'North', cases: 100, mortality: 15, recovery: 75 },
        { region: 'South', cases: 120, mortality: 18, recovery: 72 },
        { region: 'East', cases: 90, mortality: 12, recovery: 78 },
        { region: 'West', cases: 110, mortality: 14, recovery: 76 },
      ],
    },
    metabolic: {
      diseaseTrends: [
        { month: 'Jan', predicted: 150, actual: 145, risk: 70 },
        { month: 'Feb', predicted: 155, actual: 152, risk: 72 },
        { month: 'Mar', predicted: 160, actual: 158, risk: 75 },
        { month: 'Apr', predicted: 165, actual: 162, risk: 77 },
        { month: 'May', predicted: 170, actual: 168, risk: 80 },
        { month: 'Jun', predicted: 175, actual: 172, risk: 82 },
      ],
      riskFactors: [
        { factor: 'Insulin Resistance', impact: 90, trend: 'Increasing' },
        { factor: 'Diet', impact: 85, trend: 'Variable' },
        { factor: 'Physical Activity', impact: 80, trend: 'Improving' },
        { factor: 'Genetics', impact: 75, trend: 'Stable' },
        { factor: 'Age', impact: 70, trend: 'Stable' },
      ],
      treatmentEffectiveness: [
        { treatment: 'Dietary Changes', effectiveness: 90, adoption: 80 },
        { treatment: 'Exercise Programs', effectiveness: 85, adoption: 75 },
        { treatment: 'Medication', effectiveness: 80, adoption: 70 },
        { treatment: 'Surgical Options', effectiveness: 75, adoption: 55 },
        { treatment: 'Alternative Therapy', effectiveness: 65, adoption: 45 },
      ],
      regionalImpact: [
        { region: 'North', cases: 180, mortality: 8, recovery: 92 },
        { region: 'South', cases: 200, mortality: 10, recovery: 90 },
        { region: 'East', cases: 160, mortality: 7, recovery: 93 },
        { region: 'West', cases: 170, mortality: 8, recovery: 92 },
      ],
    },
    genetic: {
      diseaseTrends: [
        { month: 'Jan', predicted: 40, actual: 38, risk: 75 },
        { month: 'Feb', predicted: 42, actual: 40, risk: 77 },
        { month: 'Mar', predicted: 44, actual: 42, risk: 78 },
        { month: 'Apr', predicted: 46, actual: 44, risk: 80 },
        { month: 'May', predicted: 48, actual: 46, risk: 82 },
        { month: 'Jun', predicted: 50, actual: 48, risk: 83 },
      ],
      riskFactors: [
        { factor: 'Gene Mutations', impact: 95, trend: 'Stable' },
        { factor: 'Family History', impact: 90, trend: 'Stable' },
        { factor: 'Environmental', impact: 65, trend: 'Variable' },
        { factor: 'Age', impact: 70, trend: 'Increasing' },
        { factor: 'Lifestyle', impact: 60, trend: 'Improving' },
      ],
      treatmentEffectiveness: [
        { treatment: 'Gene Therapy', effectiveness: 85, adoption: 50 },
        { treatment: 'Targeted Drugs', effectiveness: 80, adoption: 60 },
        { treatment: 'Preventive Care', effectiveness: 75, adoption: 70 },
        { treatment: 'Surgical Options', effectiveness: 70, adoption: 45 },
        { treatment: 'Alternative Approaches', effectiveness: 60, adoption: 40 },
      ],
      regionalImpact: [
        { region: 'North', cases: 50, mortality: 5, recovery: 95 },
        { region: 'South', cases: 60, mortality: 6, recovery: 94 },
        { region: 'East', cases: 45, mortality: 4, recovery: 96 },
        { region: 'West', cases: 55, mortality: 5, recovery: 95 },
      ],
    },
  },
  analysis: {
    cardiovascular: {
      diseasePatterns: [
        { category: 'Hypertension', cases: 150, mortality: 12, recovery: 88, trend: 'Increasing' },
        { category: 'Coronary Artery', cases: 120, mortality: 15, recovery: 85, trend: 'Stable' },
        { category: 'Heart Failure', cases: 90, mortality: 18, recovery: 82, trend: 'Increasing' },
        { category: 'Arrhythmia', cases: 60, mortality: 8, recovery: 92, trend: 'Stable' },
      ],
      factorCorrelations: [
        { factor: 'Blood Pressure', correlation: 0.92, impact: 'High' },
        { factor: 'Cholesterol', correlation: 0.88, impact: 'High' },
        { factor: 'Age', correlation: 0.85, impact: 'High' },
        { factor: 'Lifestyle', correlation: 0.78, impact: 'Medium' },
        { factor: 'Genetics', correlation: 0.75, impact: 'Medium' },
      ],
      anomalyDetection: [
        { date: '2024-01', value: 100, threshold: 120, severity: 'Low' },
        { date: '2024-02', value: 115, threshold: 120, severity: 'Low' },
        { date: '2024-03', value: 125, threshold: 120, severity: 'Medium' },
        { date: '2024-04', value: 130, threshold: 120, severity: 'Medium' },
        { date: '2024-05', value: 140, threshold: 120, severity: 'High' },
        { date: '2024-06', value: 145, threshold: 120, severity: 'High' },
      ],
      geneticMarkers: [
        { marker: 'APOB', significance: 95, prevalence: 'High' },
        { marker: 'LDLR', significance: 90, prevalence: 'Medium' },
        { marker: 'PCSK9', significance: 85, prevalence: 'Low' },
      ],
      biomarkerAnalysis: [
        { biomarker: 'LDL-C', level: 'High', risk: 90 },
        { biomarker: 'HDL-C', level: 'Low', risk: 85 },
        { biomarker: 'Triglycerides', level: 'High', risk: 80 },
        { biomarker: 'CRP', level: 'Elevated', risk: 75 },
      ],
    },
    neurological: {
      diseasePatterns: [
        { category: 'Alzheimer\'s', cases: 120, mortality: 25, recovery: 65, trend: 'Increasing' },
        { category: 'Parkinson\'s', cases: 90, mortality: 20, recovery: 70, trend: 'Stable' },
        { category: 'Multiple Sclerosis', cases: 60, mortality: 15, recovery: 75, trend: 'Stable' },
        { category: 'Epilepsy', cases: 40, mortality: 10, recovery: 80, trend: 'Decreasing' },
      ],
      factorCorrelations: [
        { factor: 'Cognitive Function', correlation: 0.95, impact: 'Very High' },
        { factor: 'Age', correlation: 0.90, impact: 'High' },
        { factor: 'Genetic Markers', correlation: 0.85, impact: 'High' },
        { factor: 'Environmental', correlation: 0.70, impact: 'Medium' },
        { factor: 'Lifestyle', correlation: 0.65, impact: 'Medium' },
      ],
      anomalyDetection: [
        { date: '2024-01', value: 80, threshold: 100, severity: 'Low' },
        { date: '2024-02', value: 85, threshold: 100, severity: 'Low' },
        { date: '2024-03', value: 95, threshold: 100, severity: 'Medium' },
        { date: '2024-04', value: 105, threshold: 100, severity: 'High' },
        { date: '2024-05', value: 110, threshold: 100, severity: 'High' },
        { date: '2024-06', value: 115, threshold: 100, severity: 'Very High' },
      ],
      geneticMarkers: [
        { marker: 'APOE', significance: 98, prevalence: 'High' },
        { marker: 'PSEN1', significance: 95, prevalence: 'Medium' },
        { marker: 'PSEN2', significance: 90, prevalence: 'Low' },
      ],
      biomarkerAnalysis: [
        { biomarker: 'Beta-amyloid', level: 'Elevated', risk: 95 },
        { biomarker: 'Tau protein', level: 'High', risk: 90 },
        { biomarker: 'Neurofilament light', level: 'Elevated', risk: 85 },
      ],
    },
    metabolic: {
      diseasePatterns: [
        { category: 'Type 2 Diabetes', cases: 200, mortality: 10, recovery: 85, trend: 'Increasing' },
        { category: 'Obesity', cases: 180, mortality: 8, recovery: 80, trend: 'Increasing' },
        { category: 'Metabolic Syndrome', cases: 150, mortality: 12, recovery: 75, trend: 'Stable' },
        { category: 'Thyroid Disorders', cases: 100, mortality: 5, recovery: 90, trend: 'Stable' },
      ],
      factorCorrelations: [
        { factor: 'Insulin Resistance', correlation: 0.90, impact: 'High' },
        { factor: 'Diet', correlation: 0.85, impact: 'High' },
        { factor: 'Physical Activity', correlation: 0.80, impact: 'High' },
        { factor: 'Age', correlation: 0.75, impact: 'Medium' },
        { factor: 'Genetics', correlation: 0.70, impact: 'Medium' },
      ],
      anomalyDetection: [
        { date: '2024-01', value: 150, threshold: 180, severity: 'Low' },
        { date: '2024-02', value: 160, threshold: 180, severity: 'Low' },
        { date: '2024-03', value: 170, threshold: 180, severity: 'Medium' },
        { date: '2024-04', value: 185, threshold: 180, severity: 'High' },
        { date: '2024-05', value: 190, threshold: 180, severity: 'High' },
        { date: '2024-06', value: 195, threshold: 180, severity: 'Very High' },
      ],
      geneticMarkers: [
        { marker: 'PPARG', significance: 90, prevalence: 'High' },
        { marker: 'KCNJ11', significance: 85, prevalence: 'Medium' },
        { marker: 'TCF7L2', significance: 80, prevalence: 'Low' },
      ],
      biomarkerAnalysis: [
        { biomarker: 'Glucose', level: 'Elevated', risk: 90 },
        { biomarker: 'Insulin', level: 'High', risk: 85 },
        { biomarker: 'HbA1c', level: 'Elevated', risk: 80 },
        { biomarker: 'Leptin', level: 'High', risk: 75 },
      ],
    },
    genetic: {
      diseasePatterns: [
        { category: 'Hereditary Cancer', cases: 50, mortality: 15, recovery: 75, trend: 'Stable' },
        { category: 'Rare Disorders', cases: 30, mortality: 20, recovery: 70, trend: 'Stable' },
        { category: 'Autoimmune', cases: 40, mortality: 10, recovery: 80, trend: 'Increasing' },
        { category: 'Metabolic Disorders', cases: 25, mortality: 8, recovery: 85, trend: 'Stable' },
      ],
      factorCorrelations: [
        { factor: 'Gene Mutations', correlation: 0.98, impact: 'Very High' },
        { factor: 'Family History', correlation: 0.95, impact: 'High' },
        { factor: 'Environmental', correlation: 0.70, impact: 'Medium' },
        { factor: 'Age', correlation: 0.65, impact: 'Medium' },
        { factor: 'Lifestyle', correlation: 0.60, impact: 'Low' },
      ],
      anomalyDetection: [
        { date: '2024-01', value: 40, threshold: 50, severity: 'Low' },
        { date: '2024-02', value: 42, threshold: 50, severity: 'Low' },
        { date: '2024-03', value: 45, threshold: 50, severity: 'Medium' },
        { date: '2024-04', value: 48, threshold: 50, severity: 'High' },
        { date: '2024-05', value: 52, threshold: 50, severity: 'High' },
        { date: '2024-06', value: 55, threshold: 50, severity: 'Very High' },
      ],
      geneticMarkers: [
        { marker: 'BRCA1', significance: 98, prevalence: 'High' },
        { marker: 'BRCA2', significance: 95, prevalence: 'Medium' },
        { marker: 'TP53', significance: 90, prevalence: 'Low' },
      ],
      biomarkerAnalysis: [
        { biomarker: 'DNA Mutations', level: 'Present', risk: 95 },
        { biomarker: 'Protein Expression', level: 'Altered', risk: 90 },
        { biomarker: 'Cell Markers', level: 'Abnormal', risk: 85 },
      ],
    },
  },
  recommendations: {
    cardiovascular: {
      treatmentStrategies: [
        { strategy: 'Early Intervention', impact: 95, cost: 'Medium', timeframe: 'Immediate' },
        { strategy: 'Preventive Care', impact: 90, cost: 'Low', timeframe: 'Ongoing' },
        { strategy: 'Lifestyle Changes', impact: 85, cost: 'Low', timeframe: 'Long-term' },
        { strategy: 'Medication Management', impact: 80, cost: 'Medium', timeframe: 'Ongoing' },
        { strategy: 'Surgical Options', impact: 75, cost: 'High', timeframe: 'As needed' },
      ],
      researchPriorities: [
        { area: 'Gene Therapy', priority: 90, timeline: '5-10 years', funding: 'High' },
        { area: 'Precision Medicine', priority: 85, timeline: '3-5 years', funding: 'High' },
        { area: 'AI Prediction Models', priority: 80, timeline: '2-3 years', funding: 'Medium' },
      ],
      publicHealthInitiatives: [
        { initiative: 'Screening Programs', impact: 85, cost: 'Medium', reach: 'Wide' },
        { initiative: 'Education', impact: 80, cost: 'Low', reach: 'Wide' },
        { initiative: 'Access to Care', impact: 75, cost: 'High', reach: 'Targeted' },
      ],
      personalizedRecommendations: [
        { action: 'Regular Check-ups', priority: 'High', frequency: 'Quarterly' },
        { action: 'Dietary Changes', priority: 'High', frequency: 'Daily' },
        { action: 'Exercise Regimen', priority: 'High', frequency: 'Daily' },
        { action: 'Stress Management', priority: 'Medium', frequency: 'Daily' },
      ],
    },
    neurological: {
      treatmentStrategies: [
        { strategy: 'Cognitive Therapy', impact: 90, cost: 'Medium', timeframe: 'Long-term' },
        { strategy: 'Medication Management', impact: 85, cost: 'High', timeframe: 'Ongoing' },
        { strategy: 'Lifestyle Modifications', impact: 80, cost: 'Low', timeframe: 'Long-term' },
        { strategy: 'Stem Cell Therapy', impact: 75, cost: 'Very High', timeframe: 'Future' },
        { strategy: 'Alternative Approaches', impact: 70, cost: 'Medium', timeframe: 'Ongoing' },
      ],
      researchPriorities: [
        { area: 'Stem Cell Therapy', priority: 95, timeline: '8-12 years', funding: 'Very High' },
        { area: 'Neural Interface', priority: 90, timeline: '5-8 years', funding: 'High' },
        { area: 'AI Diagnostics', priority: 85, timeline: '3-5 years', funding: 'High' },
      ],
      publicHealthInitiatives: [
        { initiative: 'Early Detection', impact: 90, cost: 'High', reach: 'Wide' },
        { initiative: 'Support Programs', impact: 85, cost: 'Medium', reach: 'Targeted' },
        { initiative: 'Research Funding', impact: 80, cost: 'High', reach: 'Global' },
      ],
      personalizedRecommendations: [
        { action: 'Cognitive Training', priority: 'High', frequency: 'Daily' },
        { action: 'Social Engagement', priority: 'High', frequency: 'Weekly' },
        { action: 'Sleep Optimization', priority: 'High', frequency: 'Daily' },
        { action: 'Physical Activity', priority: 'Medium', frequency: 'Daily' },
      ],
    },
    metabolic: {
      treatmentStrategies: [
        { strategy: 'Dietary Management', impact: 95, cost: 'Low', timeframe: 'Long-term' },
        { strategy: 'Exercise Programs', impact: 90, cost: 'Low', timeframe: 'Long-term' },
        { strategy: 'Medication', impact: 85, cost: 'Medium', timeframe: 'Ongoing' },
        { strategy: 'Surgical Options', impact: 80, cost: 'High', timeframe: 'As needed' },
        { strategy: 'Alternative Therapy', impact: 75, cost: 'Medium', timeframe: 'Ongoing' },
      ],
      researchPriorities: [
        { area: 'Metabolic Engineering', priority: 90, timeline: '5-7 years', funding: 'High' },
        { area: 'Microbiome Therapy', priority: 85, timeline: '4-6 years', funding: 'High' },
        { area: 'AI Monitoring', priority: 80, timeline: '2-3 years', funding: 'Medium' },
      ],
      publicHealthInitiatives: [
        { initiative: 'Nutrition Education', impact: 90, cost: 'Low', reach: 'Wide' },
        { initiative: 'Exercise Programs', impact: 85, cost: 'Medium', reach: 'Wide' },
        { initiative: 'Screening Programs', impact: 80, cost: 'Medium', reach: 'Targeted' },
      ],
      personalizedRecommendations: [
        { action: 'Dietary Changes', priority: 'High', frequency: 'Daily' },
        { action: 'Exercise Regimen', priority: 'High', frequency: 'Daily' },
        { action: 'Sleep Management', priority: 'High', frequency: 'Daily' },
        { action: 'Stress Reduction', priority: 'Medium', frequency: 'Daily' },
      ],
    },
    genetic: {
      treatmentStrategies: [
        { strategy: 'Gene Therapy', impact: 90, cost: 'Very High', timeframe: 'Future' },
        { strategy: 'Targeted Drugs', impact: 85, cost: 'High', timeframe: 'Ongoing' },
        { strategy: 'Preventive Care', impact: 80, cost: 'Medium', timeframe: 'Long-term' },
        { strategy: 'Surgical Options', impact: 75, cost: 'High', timeframe: 'As needed' },
        { strategy: 'Alternative Approaches', impact: 70, cost: 'Medium', timeframe: 'Ongoing' },
      ],
      researchPriorities: [
        { area: 'CRISPR Technology', priority: 95, timeline: '5-10 years', funding: 'Very High' },
        { area: 'Gene Editing', priority: 90, timeline: '7-12 years', funding: 'High' },
        { area: 'AI Prediction', priority: 85, timeline: '3-5 years', funding: 'High' },
      ],
      publicHealthInitiatives: [
        { initiative: 'Genetic Counseling', impact: 90, cost: 'High', reach: 'Targeted' },
        { initiative: 'Family Screening', impact: 85, cost: 'Medium', reach: 'Targeted' },
        { initiative: 'Research Programs', impact: 80, cost: 'High', reach: 'Global' },
      ],
      personalizedRecommendations: [
        { action: 'Genetic Testing', priority: 'High', frequency: 'Once' },
        { action: 'Regular Monitoring', priority: 'High', frequency: 'Quarterly' },
        { action: 'Lifestyle Management', priority: 'High', frequency: 'Daily' },
        { action: 'Family Planning', priority: 'Medium', frequency: 'As needed' },
      ],
    },
  },
};

// Advanced insights data
const advancedInsights = {
  cardiovascular: {
    overview: {
      severity: "High",
      prevalence: "25%",
      mortalityRate: "31%",
      riskLevel: 85,
      keyGenes: ["APOB", "LDLR", "PCSK9"],
      biomarkers: ["LDL-C", "HDL-C", "Triglycerides", "CRP"],
    },
    riskFactors: [
      { factor: "Genetic Predisposition", impact: 90, evidence: "Strong" },
      { factor: "Lifestyle", impact: 85, evidence: "Strong" },
      { factor: "Age", impact: 80, evidence: "Strong" },
      { factor: "Environmental", impact: 65, evidence: "Moderate" },
    ],
    treatmentOptions: [
      { name: "Statins", effectiveness: 85, sideEffects: "Low", cost: "Medium" },
      { name: "Lifestyle Modification", effectiveness: 80, sideEffects: "None", cost: "Low" },
      { name: "Surgical Intervention", effectiveness: 75, sideEffects: "High", cost: "High" },
    ],
    researchInsights: [
      { area: "Gene Therapy", potential: "High", timeline: "5-10 years" },
      { area: "Precision Medicine", potential: "High", timeline: "3-5 years" },
      { area: "AI Prediction Models", potential: "Medium", timeline: "2-3 years" },
    ],
    nextSteps: [
      { action: "Genetic Testing", priority: "High", timeframe: "Immediate" },
      { action: "Lifestyle Assessment", priority: "High", timeframe: "Immediate" },
      { action: "Regular Monitoring", priority: "Medium", timeframe: "Ongoing" },
    ],
    preventionStrategies: [
      { strategy: "Regular Exercise", impact: 90, difficulty: "Medium" },
      { strategy: "Dietary Changes", impact: 85, difficulty: "Medium" },
      { strategy: "Stress Management", impact: 75, difficulty: "High" },
    ],
  },
  neurological: {
    overview: {
      severity: "Very High",
      prevalence: "15%",
      mortalityRate: "25%",
      riskLevel: 90,
      keyGenes: ["APOE", "PSEN1", "PSEN2"],
      biomarkers: ["Beta-amyloid", "Tau protein", "Neurofilament light"],
    },
    riskFactors: [
      { factor: "Genetic Mutations", impact: 95, evidence: "Strong" },
      { factor: "Age", impact: 90, evidence: "Strong" },
      { factor: "Environmental Toxins", impact: 70, evidence: "Moderate" },
      { factor: "Lifestyle", impact: 65, evidence: "Moderate" },
    ],
    treatmentOptions: [
      { name: "Targeted Therapy", effectiveness: 80, sideEffects: "Medium", cost: "High" },
      { name: "Cognitive Training", effectiveness: 75, sideEffects: "None", cost: "Low" },
      { name: "Medication", effectiveness: 70, sideEffects: "High", cost: "Medium" },
    ],
    researchInsights: [
      { area: "Stem Cell Therapy", potential: "Very High", timeline: "8-12 years" },
      { area: "Neural Interface", potential: "High", timeline: "5-8 years" },
      { area: "AI Diagnostics", potential: "High", timeline: "3-5 years" },
    ],
    nextSteps: [
      { action: "Neurological Assessment", priority: "High", timeframe: "Immediate" },
      { action: "Genetic Screening", priority: "High", timeframe: "Immediate" },
      { action: "Cognitive Testing", priority: "Medium", timeframe: "Monthly" },
    ],
    preventionStrategies: [
      { strategy: "Mental Exercise", impact: 85, difficulty: "Low" },
      { strategy: "Social Engagement", impact: 80, difficulty: "Low" },
      { strategy: "Sleep Optimization", impact: 75, difficulty: "Medium" },
    ],
  },
  metabolic: {
    overview: {
      severity: "Medium",
      prevalence: "20%",
      mortalityRate: "15%",
      riskLevel: 70,
      keyGenes: ["PPARG", "KCNJ11", "TCF7L2"],
      biomarkers: ["Glucose", "Insulin", "HbA1c", "Leptin"],
    },
    riskFactors: [
      { factor: "Lifestyle", impact: 85, evidence: "Strong" },
      { factor: "Genetic Factors", impact: 75, evidence: "Strong" },
      { factor: "Diet", impact: 80, evidence: "Strong" },
      { factor: "Physical Activity", impact: 70, evidence: "Strong" },
    ],
    treatmentOptions: [
      { name: "Lifestyle Modification", effectiveness: 85, sideEffects: "None", cost: "Low" },
      { name: "Medication", effectiveness: 80, sideEffects: "Medium", cost: "Medium" },
      { name: "Surgical Options", effectiveness: 75, sideEffects: "High", cost: "High" },
    ],
    researchInsights: [
      { area: "Metabolic Engineering", potential: "High", timeline: "5-7 years" },
      { area: "Microbiome Therapy", potential: "High", timeline: "4-6 years" },
      { area: "AI Monitoring", potential: "Medium", timeline: "2-3 years" },
    ],
    nextSteps: [
      { action: "Metabolic Panel", priority: "High", timeframe: "Immediate" },
      { action: "Dietary Assessment", priority: "High", timeframe: "Immediate" },
      { action: "Activity Monitoring", priority: "Medium", timeframe: "Weekly" },
    ],
    preventionStrategies: [
      { strategy: "Dietary Changes", impact: 90, difficulty: "Medium" },
      { strategy: "Exercise Regimen", impact: 85, difficulty: "Medium" },
      { strategy: "Sleep Management", impact: 80, difficulty: "Medium" },
    ],
  },
  genetic: {
    overview: {
      severity: "Variable",
      prevalence: "5%",
      mortalityRate: "Varies",
      riskLevel: 75,
      keyGenes: ["BRCA1", "BRCA2", "TP53"],
      biomarkers: ["DNA Mutations", "Protein Expression", "Cell Markers"],
    },
    riskFactors: [
      { factor: "Inherited Mutations", impact: 95, evidence: "Strong" },
      { factor: "Family History", impact: 85, evidence: "Strong" },
      { factor: "Environmental Triggers", impact: 60, evidence: "Moderate" },
      { factor: "Age", impact: 55, evidence: "Moderate" },
    ],
    treatmentOptions: [
      { name: "Gene Therapy", effectiveness: 85, sideEffects: "High", cost: "Very High" },
      { name: "Targeted Drugs", effectiveness: 80, sideEffects: "Medium", cost: "High" },
      { name: "Preventive Measures", effectiveness: 75, sideEffects: "Low", cost: "Medium" },
    ],
    researchInsights: [
      { area: "CRISPR Technology", potential: "Very High", timeline: "5-10 years" },
      { area: "Gene Editing", potential: "High", timeline: "7-12 years" },
      { area: "AI Prediction", potential: "High", timeline: "3-5 years" },
    ],
    nextSteps: [
      { action: "Genetic Counseling", priority: "High", timeframe: "Immediate" },
      { action: "Family Screening", priority: "High", timeframe: "Immediate" },
      { action: "Regular Monitoring", priority: "High", timeframe: "Quarterly" },
    ],
    preventionStrategies: [
      { strategy: "Early Detection", impact: 90, difficulty: "Medium" },
      { strategy: "Lifestyle Management", impact: 80, difficulty: "Medium" },
      { strategy: "Regular Screening", impact: 85, difficulty: "Low" },
    ],
  },
};

const AIDiseaseInsights = () => {
  const [selectedDisease, setSelectedDisease] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const renderAdvancedInsights = (disease) => {
    const data = advancedInsights[disease];
    if (!data) return null;

    return (
      <div className="space-y-6">
        {/* Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>Disease Overview</span>
              <Badge variant={data.overview.severity === "Very High" ? "destructive" : "default"}>
                {data.overview.severity} Risk
              </Badge>
            </CardTitle>
            <CardDescription>Comprehensive analysis of {disease} conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Prevalence</p>
                <p className="text-2xl font-bold">{data.overview.prevalence}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Mortality Rate</p>
                <p className="text-2xl font-bold">{data.overview.mortalityRate}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Risk Level</p>
                <Progress value={data.overview.riskLevel} className="h-2" />
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Key Genes</p>
                <div className="flex flex-wrap gap-2">
                  {data.overview.keyGenes.map((gene) => (
                    <Badge key={gene} variant="secondary">{gene}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Biomarkers</p>
                <div className="flex flex-wrap gap-2">
                  {data.overview.biomarkers.map((marker) => (
                    <Badge key={marker} variant="outline">{marker}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Factors and Treatment Options */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Risk Factors</CardTitle>
              <CardDescription>Key factors influencing disease development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.riskFactors.map((factor) => (
                  <div key={factor.factor} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{factor.factor}</span>
                      <Badge variant="outline">{factor.evidence} Evidence</Badge>
                    </div>
                    <Progress value={factor.impact} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Treatment Options</CardTitle>
              <CardDescription>Available and emerging treatment approaches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.treatmentOptions.map((treatment) => (
                  <div key={treatment.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{treatment.name}</span>
                      <div className="flex gap-2">
                        <Badge variant="outline">{treatment.cost}</Badge>
                        <Badge variant={treatment.sideEffects === "None" ? "default" : "destructive"}>
                          {treatment.sideEffects} Side Effects
                        </Badge>
                      </div>
                    </div>
                    <Progress value={treatment.effectiveness} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Research Insights and Next Steps */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Research Insights</CardTitle>
              <CardDescription>Emerging research and future developments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.researchInsights.map((insight) => (
                  <div key={insight.area} className="flex items-start gap-4 p-4 rounded-lg border">
                    <div className="flex-1">
                      <h4 className="font-medium">{insight.area}</h4>
                      <p className="text-sm text-muted-foreground">Timeline: {insight.timeline}</p>
                    </div>
                    <Badge variant={insight.potential === "Very High" ? "default" : "secondary"}>
                      {insight.potential} Potential
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>Recommended actions and timeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.nextSteps.map((step) => (
                  <div key={step.action} className="flex items-start gap-4 p-4 rounded-lg border">
                    <div className="flex-1">
                      <h4 className="font-medium">{step.action}</h4>
                      <p className="text-sm text-muted-foreground">Timeframe: {step.timeframe}</p>
                    </div>
                    <Badge variant={step.priority === "High" ? "default" : "secondary"}>
                      {step.priority} Priority
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prevention Strategies */}
        <Card>
          <CardHeader>
            <CardTitle>Prevention Strategies</CardTitle>
            <CardDescription>Recommended preventive measures and their impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {data.preventionStrategies.map((strategy) => (
                <div key={strategy.strategy} className="p-4 rounded-lg border space-y-2">
                  <h4 className="font-medium">{strategy.strategy}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Impact</span>
                      <span>{strategy.impact}%</span>
                    </div>
                    <Progress value={strategy.impact} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Difficulty</span>
                      <span>{strategy.difficulty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderPredictions = () => {
    if (selectedDisease === 'all') {
      return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(mockData.predictions).map(([disease, data]) => (
            <Card key={disease} className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedDisease(disease)}>
              <CardHeader>
                <CardTitle className="capitalize">{disease} Predictions</CardTitle>
                <CardDescription>Click to view detailed predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.diseaseTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="predicted" stroke="#8884d8" />
                      <Line type="monotone" dataKey="actual" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    const data = mockData.predictions[selectedDisease];
    if (!data) return null;

    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Disease Trend Predictions</CardTitle>
              <CardDescription>AI-predicted vs actual disease trends with risk assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.diseaseTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="predicted" stroke="#8884d8" name="Predicted Cases" />
                    <Line yAxisId="left" type="monotone" dataKey="actual" stroke="#82ca9d" name="Actual Cases" />
                    <Line yAxisId="right" type="monotone" dataKey="risk" stroke="#ff7300" name="Risk Level" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Factor Impact</CardTitle>
              <CardDescription>AI-analyzed impact of various risk factors with trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.riskFactors}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="factor" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="impact" fill="#8884d8" name="Impact Level" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {data.riskFactors.map((factor) => (
                    <div key={factor.factor} className="flex items-center justify-between p-2 rounded-lg border">
                      <span className="text-sm">{factor.factor}</span>
                      <Badge variant={factor.trend === 'Improving' ? 'default' : factor.trend === 'Increasing' ? 'destructive' : 'secondary'}>
                        {factor.trend}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Treatment Effectiveness</CardTitle>
              <CardDescription>AI-predicted effectiveness and adoption rates of treatments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.treatmentEffectiveness}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="treatment" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="effectiveness" fill="#8884d8" name="Effectiveness" />
                    <Bar yAxisId="right" dataKey="adoption" fill="#82ca9d" name="Adoption Rate" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Impact</CardTitle>
              <CardDescription>Geographic distribution of cases, mortality, and recovery rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.regionalImpact}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="cases" fill="#8884d8" name="Cases" />
                    <Bar yAxisId="left" dataKey="mortality" fill="#ff7300" name="Mortality" />
                    <Bar yAxisId="right" dataKey="recovery" fill="#82ca9d" name="Recovery Rate" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderAnalysis = () => {
    if (selectedDisease === 'all') {
      return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(mockData.analysis).map(([disease, data]) => (
            <Card key={disease} className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedDisease(disease)}>
              <CardHeader>
                <CardTitle className="capitalize">{disease} Analysis</CardTitle>
                <CardDescription>Click to view detailed analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Disease Patterns</p>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.diseasePatterns}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="cases" fill="#8884d8" />
                          <Bar dataKey="mortality" fill="#ff7300" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    const data = mockData.analysis[selectedDisease];
    if (!data) return null;

    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Disease Patterns</CardTitle>
              <CardDescription>Analysis of disease categories and outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.diseasePatterns}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="cases" fill="#8884d8" name="Cases" />
                    <Bar yAxisId="left" dataKey="mortality" fill="#ff7300" name="Mortality" />
                    <Bar yAxisId="right" dataKey="recovery" fill="#82ca9d" name="Recovery Rate" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {data.diseasePatterns.map((pattern) => (
                  <div key={pattern.category} className="flex items-center justify-between p-2 rounded-lg border">
                    <span className="text-sm">{pattern.category}</span>
                    <Badge variant={pattern.trend === 'Increasing' ? 'destructive' : pattern.trend === 'Decreasing' ? 'default' : 'secondary'}>
                      {pattern.trend}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Factor Correlations</CardTitle>
              <CardDescription>Correlation analysis of various factors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.factorCorrelations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="factor" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="correlation" fill="#8884d8" name="Correlation" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {data.factorCorrelations.map((factor) => (
                  <div key={factor.factor} className="flex items-center justify-between p-2 rounded-lg border">
                    <span className="text-sm">{factor.factor}</span>
                    <Badge variant={factor.impact === 'Very High' ? 'destructive' : factor.impact === 'High' ? 'default' : 'secondary'}>
                      {factor.impact}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Anomaly Detection</CardTitle>
              <CardDescription>AI-detected anomalies in disease patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.anomalyDetection}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="value" fill="#8884d8" />
                    <Line type="monotone" dataKey="threshold" stroke="#ff7300" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {data.anomalyDetection.map((anomaly) => (
                  <div key={anomaly.date} className="flex items-center justify-between p-2 rounded-lg border">
                    <span className="text-sm">{anomaly.date}</span>
                    <Badge variant={anomaly.severity === 'Very High' ? 'destructive' : anomaly.severity === 'High' ? 'default' : 'secondary'}>
                      {anomaly.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Genetic & Biomarker Analysis</CardTitle>
              <CardDescription>Analysis of genetic markers and biomarkers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Genetic Markers</p>
                  <div className="space-y-2">
                    {data.geneticMarkers.map((marker) => (
                      <div key={marker.marker} className="flex items-center justify-between p-2 rounded-lg border">
                        <span className="text-sm">{marker.marker}</span>
                        <div className="flex gap-2">
                          <Badge variant="outline">{marker.prevalence}</Badge>
                          <Badge variant={marker.significance >= 95 ? 'destructive' : marker.significance >= 90 ? 'default' : 'secondary'}>
                            {marker.significance}% Significance
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Biomarkers</p>
                  <div className="space-y-2">
                    {data.biomarkerAnalysis.map((biomarker) => (
                      <div key={biomarker.biomarker} className="flex items-center justify-between p-2 rounded-lg border">
                        <span className="text-sm">{biomarker.biomarker}</span>
                        <div className="flex gap-2">
                          <Badge variant="outline">{biomarker.level}</Badge>
                          <Badge variant={biomarker.risk >= 90 ? 'destructive' : biomarker.risk >= 80 ? 'default' : 'secondary'}>
                            {biomarker.risk}% Risk
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderRecommendations = () => {
    if (selectedDisease === 'all') {
      return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(mockData.recommendations).map(([disease, data]) => (
            <Card key={disease} className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedDisease(disease)}>
              <CardHeader>
                <CardTitle className="capitalize">{disease} Recommendations</CardTitle>
                <CardDescription>Click to view detailed recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Treatment Strategies</p>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.treatmentStrategies}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="strategy" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="impact" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    const data = mockData.recommendations[selectedDisease];
    if (!data) return null;

    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Treatment Strategies</CardTitle>
              <CardDescription>AI-recommended treatment approaches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.treatmentStrategies}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="strategy" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="impact" fill="#8884d8" name="Impact" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {data.treatmentStrategies.map((strategy) => (
                  <div key={strategy.strategy} className="flex items-center justify-between p-2 rounded-lg border">
                    <span className="text-sm">{strategy.strategy}</span>
                    <div className="flex gap-2">
                      <Badge variant="outline">{strategy.cost}</Badge>
                      <Badge variant={strategy.timeframe === 'Immediate' ? 'destructive' : strategy.timeframe === 'Ongoing' ? 'default' : 'secondary'}>
                        {strategy.timeframe}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Research Priorities</CardTitle>
              <CardDescription>AI-suggested research focus areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.researchPriorities}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="area" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="priority" fill="#8884d8" name="Priority" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {data.researchPriorities.map((priority) => (
                  <div key={priority.area} className="flex items-center justify-between p-2 rounded-lg border">
                    <span className="text-sm">{priority.area}</span>
                    <div className="flex gap-2">
                      <Badge variant="outline">{priority.funding}</Badge>
                      <Badge variant={priority.timeline.includes('years') ? 'secondary' : 'default'}>
                        {priority.timeline}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Public Health Initiatives</CardTitle>
              <CardDescription>AI-recommended public health strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.publicHealthInitiatives}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="initiative" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="impact" fill="#8884d8" name="Impact" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {data.publicHealthInitiatives.map((initiative) => (
                  <div key={initiative.initiative} className="flex items-center justify-between p-2 rounded-lg border">
                    <span className="text-sm">{initiative.initiative}</span>
                    <div className="flex gap-2">
                      <Badge variant="outline">{initiative.cost}</Badge>
                      <Badge variant={initiative.reach === 'Wide' ? 'default' : 'secondary'}>
                        {initiative.reach}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>AI-generated personalized action items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.personalizedRecommendations.map((recommendation) => (
                  <div key={recommendation.action} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-1">
                      <h4 className="font-medium">{recommendation.action}</h4>
                      <p className="text-sm text-muted-foreground">Frequency: {recommendation.frequency}</p>
                    </div>
                    <Badge variant={recommendation.priority === 'High' ? 'default' : 'secondary'}>
                      {recommendation.priority} Priority
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Disease Insights</h1>
          <p className="text-muted-foreground">
            Advanced AI-powered analysis and predictions for disease patterns
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search insights..."
              className="pl-8 w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedDisease} onValueChange={setSelectedDisease}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select disease" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Diseases</SelectItem>
              <SelectItem value="cardiovascular">Cardiovascular</SelectItem>
              <SelectItem value="neurological">Neurological</SelectItem>
              <SelectItem value="metabolic">Metabolic</SelectItem>
              <SelectItem value="genetic">Genetic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="predictions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="predictions">
            <TrendingUp className="w-4 h-4 mr-2" />
            Predictions
          </TabsTrigger>
          <TabsTrigger value="analysis">
            <Brain className="w-4 h-4 mr-2" />
            Analysis
          </TabsTrigger>
          <TabsTrigger value="recommendations">
            <Lightbulb className="w-4 h-4 mr-2" />
            Recommendations
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Activity className="w-4 h-4 mr-2" />
            Advanced Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          {renderPredictions()}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          {renderAnalysis()}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          {renderRecommendations()}
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          {selectedDisease === 'all' ? (
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(advancedInsights).map(([disease, data]) => (
                <Card key={disease} className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedDisease(disease)}>
                  <CardHeader>
                    <CardTitle className="capitalize">{disease} Disease</CardTitle>
                    <CardDescription>Click to view detailed insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Severity</span>
                        <Badge variant={data.overview.severity === "Very High" ? "destructive" : "default"}>
                          {data.overview.severity}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Prevalence</span>
                        <span className="font-medium">{data.overview.prevalence}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Risk Level</span>
                        <Progress value={data.overview.riskLevel} className="w-24" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            renderAdvancedInsights(selectedDisease)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIDiseaseInsights; 