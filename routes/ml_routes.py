from flask import Blueprint, request, jsonify
import os
from utils.ml_models import MLTrainer
from utils.visualization import DataVisualizer
from utils.data_processor import DataProcessor
import pandas as pd

ml_routes = Blueprint('ml_routes', __name__)
ml_trainer = MLTrainer()
visualizer = DataVisualizer()
data_processor = DataProcessor()

@ml_routes.route('/train', methods=['POST'])
def train_model():
    """Train a machine learning model"""
    try:
        data = request.get_json()
        file_path = os.path.join('uploads', data['filename'])
        model_name = data.get('model_name', 'random_forest_classifier')
        target_column = data['target_column']
        
        # Load and preprocess data
        df = data_processor.load_data(file_path)
        df = data_processor.preprocess_data(df)
        
        # Prepare data for training
        X_train, X_test, y_train, y_test = ml_trainer.prepare_data(
            df, target_column
        )
        
        # Train model
        training_result = ml_trainer.train_model(model_name, X_train, y_train)
        
        # Evaluate model
        evaluation_result = ml_trainer.evaluate_model(model_name, X_test, y_test)
        
        # Create visualizations
        feature_importance_plot = visualizer.create_feature_importance_plot(
            training_result['feature_importance']
        )
        
        return jsonify({
            'training_result': training_result,
            'evaluation_result': evaluation_result,
            'visualizations': {
                'feature_importance': feature_importance_plot
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ml_routes.route('/visualize', methods=['POST'])
def create_visualizations():
    """Create various visualizations for the data"""
    try:
        data = request.get_json()
        file_path = os.path.join('uploads', data['filename'])
        visualization_type = data.get('type', 'all')
        
        # Load and preprocess data
        df = data_processor.load_data(file_path)
        df = data_processor.preprocess_data(df)
        
        visualizations = {}
        
        if visualization_type in ['all', 'heatmap']:
            visualizations['heatmap'] = visualizer.create_heatmap(df)
            
        if visualization_type in ['all', 'boxplot']:
            visualizations['boxplot'] = visualizer.create_box_plot(df)
            
        if visualization_type in ['all', 'correlation']:
            correlation_matrix = df.corr()
            visualizations['correlation'] = visualizer.create_correlation_plot(
                correlation_matrix
            )
            
        if visualization_type in ['all', 'pca']:
            # Perform PCA
            pca_result = data_processor.perform_pca(df)
            visualizations['pca'] = visualizer.create_pca_plot(
                pca_result['pca_result']
            )
            
        return jsonify({'visualizations': visualizations})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ml_routes.route('/predict', methods=['POST'])
def make_prediction():
    """Make predictions using a trained model"""
    try:
        data = request.get_json()
        model_name = data['model_name']
        input_data = pd.DataFrame(data['input_data'])
        
        # Load model if not already loaded
        if model_name not in ml_trainer.trained_models:
            ml_trainer.load_model(model_name)
            
        # Make prediction
        model = ml_trainer.trained_models[model_name]
        predictions = model.predict(input_data)
        
        return jsonify({
            'predictions': predictions.tolist(),
            'model_name': model_name
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500 