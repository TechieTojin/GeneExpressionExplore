import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.svm import SVC, SVR
from sklearn.metrics import accuracy_score, mean_squared_error, r2_score
from typing import Dict, Tuple, List
import joblib
import os

class MLTrainer:
    def __init__(self):
        self.models = {
            'random_forest_classifier': RandomForestClassifier(),
            'random_forest_regressor': RandomForestRegressor(),
            'svm_classifier': SVC(),
            'svm_regressor': SVR()
        }
        self.trained_models = {}
        
    def prepare_data(self, data: pd.DataFrame, target_column: str, 
                    test_size: float = 0.2) -> Tuple:
        """Prepare data for training"""
        X = data.drop(columns=[target_column])
        y = data[target_column]
        return train_test_split(X, y, test_size=test_size, random_state=42)
    
    def train_model(self, model_name: str, X_train: pd.DataFrame, 
                   y_train: pd.Series) -> Dict:
        """Train a specific model"""
        if model_name not in self.models:
            raise ValueError(f"Model {model_name} not found")
            
        model = self.models[model_name]
        model.fit(X_train, y_train)
        self.trained_models[model_name] = model
        
        return {
            'model_name': model_name,
            'feature_importance': self._get_feature_importance(model, X_train.columns)
        }
    
    def evaluate_model(self, model_name: str, X_test: pd.DataFrame, 
                      y_test: pd.Series) -> Dict:
        """Evaluate model performance"""
        if model_name not in self.trained_models:
            raise ValueError(f"Model {model_name} not trained yet")
            
        model = self.trained_models[model_name]
        y_pred = model.predict(X_test)
        
        metrics = {
            'model_name': model_name,
            'predictions': y_pred.tolist()
        }
        
        if isinstance(model, (RandomForestClassifier, SVC)):
            metrics['accuracy'] = accuracy_score(y_test, y_pred)
        else:
            metrics['mse'] = mean_squared_error(y_test, y_pred)
            metrics['r2'] = r2_score(y_test, y_pred)
            
        return metrics
    
    def save_model(self, model_name: str, path: str = 'models'):
        """Save trained model to disk"""
        if model_name not in self.trained_models:
            raise ValueError(f"Model {model_name} not trained yet")
            
        os.makedirs(path, exist_ok=True)
        model_path = os.path.join(path, f"{model_name}.joblib")
        joblib.dump(self.trained_models[model_name], model_path)
        return model_path
    
    def load_model(self, model_name: str, path: str = 'models'):
        """Load trained model from disk"""
        model_path = os.path.join(path, f"{model_name}.joblib")
        if not os.path.exists(model_path):
            raise ValueError(f"Model file not found at {model_path}")
            
        self.trained_models[model_name] = joblib.load(model_path)
        return self.trained_models[model_name]
    
    def _get_feature_importance(self, model, feature_names: List[str]) -> Dict:
        """Get feature importance for tree-based models"""
        if hasattr(model, 'feature_importances_'):
            importance = model.feature_importances_
            return dict(zip(feature_names, importance.tolist()))
        return {} 