import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
import numpy as np
from typing import Dict, List, Union
import json

class DataVisualizer:
    def __init__(self):
        self.color_scale = px.colors.sequential.Viridis
    
    def create_heatmap(self, data: pd.DataFrame, title: str = "Gene Expression Heatmap") -> Dict:
        """Create a heatmap visualization of gene expression data"""
        fig = go.Figure(data=go.Heatmap(
            z=data.values,
            x=data.columns,
            y=data.index,
            colorscale=self.color_scale
        ))
        
        fig.update_layout(
            title=title,
            xaxis_title="Genes",
            yaxis_title="Samples",
            height=800,
            width=1000
        )
        
        return json.loads(fig.to_json())
    
    def create_pca_plot(self, pca_data: np.ndarray, labels: List[str] = None, 
                       title: str = "PCA Plot") -> Dict:
        """Create a PCA visualization"""
        df = pd.DataFrame(pca_data[:, :2], columns=['PC1', 'PC2'])
        if labels:
            df['label'] = labels
            
        fig = px.scatter(df, x='PC1', y='PC2', color='label' if labels else None,
                        title=title)
        
        return json.loads(fig.to_json())
    
    def create_box_plot(self, data: pd.DataFrame, title: str = "Gene Expression Distribution") -> Dict:
        """Create a box plot of gene expression values"""
        fig = px.box(data, title=title)
        fig.update_layout(
            xaxis_title="Genes",
            yaxis_title="Expression Level",
            height=600,
            width=1000
        )
        
        return json.loads(fig.to_json())
    
    def create_feature_importance_plot(self, importance_dict: Dict, 
                                     title: str = "Feature Importance") -> Dict:
        """Create a bar plot of feature importance"""
        df = pd.DataFrame({
            'Feature': list(importance_dict.keys()),
            'Importance': list(importance_dict.values())
        })
        df = df.sort_values('Importance', ascending=False)
        
        fig = px.bar(df, x='Feature', y='Importance', title=title)
        fig.update_layout(
            xaxis_title="Features",
            yaxis_title="Importance Score",
            height=600,
            width=1000
        )
        
        return json.loads(fig.to_json())
    
    def create_correlation_plot(self, correlation_matrix: pd.DataFrame, 
                              title: str = "Gene Correlation Matrix") -> Dict:
        """Create a correlation matrix heatmap"""
        fig = go.Figure(data=go.Heatmap(
            z=correlation_matrix.values,
            x=correlation_matrix.columns,
            y=correlation_matrix.index,
            colorscale='RdBu',
            zmid=0
        ))
        
        fig.update_layout(
            title=title,
            height=800,
            width=1000
        )
        
        return json.loads(fig.to_json())
    
    def create_cluster_plot(self, data: pd.DataFrame, cluster_labels: List[int],
                          title: str = "Cluster Visualization") -> Dict:
        """Create a scatter plot of clusters"""
        df = pd.DataFrame(data[:, :2], columns=['Feature 1', 'Feature 2'])
        df['Cluster'] = cluster_labels
        
        fig = px.scatter(df, x='Feature 1', y='Feature 2', color='Cluster',
                        title=title)
        
        return json.loads(fig.to_json()) 