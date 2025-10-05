from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from utils.data_processor import DataProcessor
from utils.analysis import GeneExpressionAnalyzer

api = Blueprint('api', __name__)
data_processor = DataProcessor()
analyzer = GeneExpressionAnalyzer()

@api.route('/upload', methods=['POST'])
def upload_file():
    """Handle file upload"""
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join('uploads', filename)
        file.save(file_path)
        return jsonify({'message': 'File uploaded successfully', 'filename': filename})

@api.route('/analyze', methods=['POST'])
def analyze_data():
    """Analyze gene expression data"""
    try:
        data = request.get_json()
        file_path = os.path.join('uploads', data['filename'])
        
        # Load and preprocess data
        df = data_processor.load_data(file_path)
        df = data_processor.preprocess_data(df)
        
        # Perform analysis
        pca_results = analyzer.perform_pca(df)
        clustering_results = analyzer.perform_clustering(df)
        correlation_matrix = analyzer.calculate_correlation_matrix(df)
        
        return jsonify({
            'pca': pca_results,
            'clustering': clustering_results,
            'correlation': correlation_matrix.to_dict()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/statistics', methods=['POST'])
def get_statistics():
    """Get basic statistics for the dataset"""
    try:
        data = request.get_json()
        file_path = os.path.join('uploads', data['filename'])
        
        df = data_processor.load_data(file_path)
        stats = data_processor.get_basic_statistics(df)
        
        return jsonify(stats)
    except Exception as e:
        return jsonify({'error': str(e)}), 500 