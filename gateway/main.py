from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Rutas proxy
@app.route('/api/v1/orders', methods=['GET', 'POST', 'PUT', 'DELETE', 'UPDATE'])
def orders_proxy():
    url = 'http://localhost:3008'  # Cambiar la URL según sea necesario
    response = requests.request(
        method=request.method,
        url=url,
        headers={key: value for (key, value) in request.headers if key != 'Host'},
        data=request.get_data(),
        cookies=request.cookies,
        allow_redirects=False)
    return response.content, response.status_code, dict(response.headers.items())

@app.route('/api/v1/products', methods=['GET', 'POST', 'PUT', 'DELETE', 'UPDATE'])
def products_proxy():
    url = 'http://localhost:3006'  # Cambiar la URL según sea necesario
    response = requests.request(
        method=request.method,
        url=url,
        headers={key: value for (key, value) in request.headers if key != 'Host'},
        data=request.get_data(),
        cookies=request.cookies,
        allow_redirects=False)
    return response.content, response.status_code, dict(response.headers.items())


if __name__ == '__main__':
    app.run(port=3000)  # Puerto en el que se ejecutará el gateway
