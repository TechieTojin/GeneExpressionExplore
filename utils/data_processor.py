import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from typing import Tuple, Dict, List

class DataProcessor:
    def __init__(self):
        self.scaler = StandardScaler()
    
    def load_data(self, file_path: str) -> pd.DataFrame:
        """Load gene expression data from file"""
        try:
            if file_path.endswith('.csv'):
                return pd.read_csv(file_path)
            elif file_path.endswith(('.xls', '.xlsx')):
                return pd.read_excel(file_path)
            else:
                raise ValueError("Unsupported file format")
        except Exception as e:
            raise Exception(f"Error loading data: {str(e)}")

    def preprocess_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """Preprocess the gene expression data"""
        # Remove any rows with missing values
        df = df.dropna()
        
        # Remove any columns with zero variance
        df = df.loc[:, df.var() != 0]
        
        return df

    def normalize_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """Normalize the gene expression data"""
        normalized_data = self.scaler.fit_transform(df)
        return pd.DataFrame(normalized_data, columns=df.columns, index=df.index)

    def get_basic_statistics(self, df: pd.DataFrame) -> Dict:
        """Calculate basic statistics for the dataset"""
        return {
            'mean': df.mean().to_dict(),
            'std': df.std().to_dict(),
            'min': df.min().to_dict(),
            'max': df.max().to_dict()
        } 