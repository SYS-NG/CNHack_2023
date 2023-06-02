from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return 'No image file uploaded', 400

    image = request.files['image']
    # Process the image and generate a response
    # Replace the code below with your own image processing logic

    # Save the image to a file
    image.save('uploaded_image.jpg')

    # Generate a response
    response = {'message': 'Image uploaded successfully', 'filename': 'uploaded_image.jpg'}

    return response

if __name__ == '__main__':
    app.run()