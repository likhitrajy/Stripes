import requests
from flask import Flask, jsonify, request
from flask_cors import CORS
from config import API_KEY

app = Flask(__name__)
CORS(app)

@app.route('/get_animal_data', methods=['GET'])
def get_animal_data():
    name = request.args.get('name', 'panda')
    api_url = 'https://api.api-ninjas.com/v1/animals?name={}'.format(name)
    headers = {'X-Api-Key': API_KEY}
    
    try:
        response = requests.get(api_url, headers=headers)
        response.raise_for_status()
        animal_data = response.text
        return jsonify({"animal_data": animal_data})

    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
