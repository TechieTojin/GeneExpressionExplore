import numpy as np
import pandas as pd
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
from typing import Dict, List, Tuple
import plotly.express as px

class GeneExpressionAnalyzer:
    def __init__(self):
        self.pca = PCA()
        self.kmeans = KMeans()

    def perform_pca(self, data: pd.DataFrame, n_components: int = 2) -> Dict:
        """Perform Principal Component Analysis"""
        pca_result = self.pca.fit_transform(data)
        
        # Calculate explained variance
        explained_variance = self.pca.explained_variance_ratio_
        
        return {
            'pca_result': pca_result.tolist(),
            'explained_variance': explained_variance.tolist(),
            'components': self.pca.components_.tolist()
        }

    def perform_clustering(self, data: pd.DataFrame, n_clusters: int = 3) -> Dict:
        """Perform K-means clustering"""
        self.kmeans = KMeans(n_clusters=n_clusters)
        clusters = self.kmeans.fit_predict(data)
        
        return {
            'cluster_labels': clusters.tolist(),
            'cluster_centers': self.kmeans.cluster_centers_.tolist()
        }

    def calculate_correlation_matrix(self, data: pd.DataFrame) -> pd.DataFrame:
        """Calculate correlation matrix between genes"""
        return data.corr()

    def find_differentially_expressed_genes(self, 
                                          data: pd.DataFrame, 
                                          threshold: float = 2.0) -> List[str]:
        """Find differentially expressed genes based on variance"""
        gene_variance = data.var()
        significant_genes = gene_variance[gene_variance > threshold].index.tolist()
        return significant_genes

    def create_heatmap_data(self, data: pd.DataFrame) -> Dict:
        """Prepare data for heatmap visualization"""
        return {
            'values': data.values.tolist(),
            'row_labels': data.index.tolist(),
            'column_labels': data.columns.tolist()
        } 