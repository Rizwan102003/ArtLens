import React, { useState } from 'react';
import axios from 'axios';

function ArtLens() {
    const [formData, setFormData] = useState({
        description: '',
        artist_name: '',
        artwork_title: '',
        year_created: '',
        restoration_type: '',
        completion_date: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = () => {
        axios.post('/submit_restoration', formData)
            .then(response => {
                console.log(response.data.message);
                // Add any UI update or redirection logic here
            })
            .catch(error => {
                console.error('Error:', error.response.data.error);
            });
    }

    return (
        <div>
            <h1>ArtLens - Explore Art with AR</h1>
            {/* AR functionality goes here */}
            <div>
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange}></textarea>
            </div>
            <div>
                <label>Artist Name:</label>
                <input type="text" name="artist_name" value={formData.artist_name} onChange={handleInputChange} />
            </div>
            <div>
                <label>Artwork Title:</label>
                <input type="text" name="artwork_title" value={formData.artwork_title} onChange={handleInputChange} />
            </div>
            <div>
                <label>Year Created:</label>
                <input type="text" name="year_created" value={formData.year_created} onChange={handleInputChange} />
            </div>
            <div>
                <label>Restoration Type:</label>
                <input type="text" name="restoration_type" value={formData.restoration_type} onChange={handleInputChange} />
            </div>
            <div>
                <label>Completion Date:</label>
                <input type="date" name="completion_date" value={formData.completion_date} onChange={handleInputChange} />
            </div>
            <button onClick={handleSubmit}>Submit Restoration</button>
        </div>
    );
}

export default ArtLens;
