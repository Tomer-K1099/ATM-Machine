from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

# data
accounts = {
    "1234": 1000,
    "5678": 500
}

@app.route('/api/balance/<accountNumber>', methods=['GET'])
def get_balance(accountNumber):
    if accountNumber not in accounts:
        return jsonify({"error": "Account not found"}), 404
    return jsonify({"accountNumber": accountNumber, "balance": accounts[accountNumber]}), 200

@app.route('/api/withdraw', methods=['POST'])
def withdraw():
    data = request.get_json()
    acc_no = data.get('accountNumber')
    amount = data.get('amount')

    if acc_no not in accounts:
        return jsonify({"error": "Account not found"}), 404
    if amount is None or amount <= 0:
        return jsonify({"error": "Invalid withdrawal amount"}), 400
    if accounts[acc_no] < amount:
        return jsonify({"error": "Insufficient balance"}), 400

    accounts[acc_no] -= amount
    return jsonify({
        "status": "success",
        "accountNumber": acc_no,
        "balance": accounts[acc_no]
    }), 200

@app.route('/api/deposit', methods=['POST'])
def deposit():
    data = request.get_json()
    acc_no = data.get('accountNumber')
    amount = data.get('amount')

    if acc_no not in accounts:
        return jsonify({"error": "Account not found"}), 404
    if amount is None or amount <= 0:
        return jsonify({"error": "Invalid deposit amount"}), 400

    accounts[acc_no] += amount
    return jsonify({
        "status": "success",
        "accountNumber": acc_no,
        "balance": accounts[acc_no]
    }), 200

# @app.route('/')
# def home():
#     # Serve the main client page
#     return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
