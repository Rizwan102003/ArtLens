from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///art_lens.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Restoration(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255), nullable=False)
    artist_name = db.Column(db.String(100), nullable=False)
    artwork_title = db.Column(db.String(100), nullable=False)
    year_created = db.Column(db.Integer)
    # Additional fields for restoration model
    restoration_type = db.Column(db.String(50))
    completion_date = db.Column(db.Date)

    def __repr__(self):
        return f'<Restoration {self.id}>'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit_restoration', methods=['POST'])
def submit_restoration():
    data = request.json
    description = data.get('description')
    artist_name = data.get('artist_name')
    artwork_title = data.get('artwork_title')
    year_created = data.get('year_created')
    restoration_type = data.get('restoration_type')
    completion_date = data.get('completion_date')

    if not description or not artist_name or not artwork_title:
        return jsonify({'error': 'Missing required fields'}), 400

    new_restoration = Restoration(
        description=description,
        artist_name=artist_name,
        artwork_title=artwork_title,
        year_created=year_created,
        restoration_type=restoration_type,
        completion_date=completion_date
    )
    db.session.add(new_restoration)
    db.session.commit()

    return jsonify({'message': 'Restoration submitted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
