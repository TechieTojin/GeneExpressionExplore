# Gene Expression Explorer Backend

This is the backend service for the Gene Expression Explorer, providing APIs for accessing and analyzing gene expression data from NCBI's GEO repository.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file:
```bash
FLASK_APP=app.py
FLASK_ENV=development
```

## Running the Server

```bash
flask run
```

The server will start on `http://localhost:5000`

## API Endpoints

### Get Available Datasets
```
GET /api/datasets
```

### Get Dataset Details
```
GET /api/datasets/<accession>
```

### Perform Differential Expression Analysis
```
POST /api/datasets/<accession>/analysis
Body: {
    "groups": {
        "control": ["Sample_1", "Sample_2"],
        "disease": ["Sample_3", "Sample_4"]
    }
}
```

### Get Gene Expression Data
```
GET /api/datasets/<accession>/genes
GET /api/datasets/<accession>/genes?gene_id=<gene_id>
```

### Get Sample Information
```
GET /api/datasets/<accession>/samples
```

## Development

The backend currently uses mock data for development. To implement actual GEO dataset access:

1. Implement the `download_geo_dataset` function in `app.py`
2. Add proper error handling and data validation
3. Implement actual differential expression analysis
4. Add caching for downloaded datasets
5. Add authentication if needed

## Dependencies

- Flask: Web framework
- pandas: Data manipulation
- numpy: Numerical computations
- scipy: Scientific computations
- geoparse: GEO dataset parsing
- scikit-learn: Machine learning
- plotly: Data visualization
- requests: HTTP requests
- python-dotenv: Environment variables 