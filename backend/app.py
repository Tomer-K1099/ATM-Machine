from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Data structure contains PIN and balance information for each account.
accounts = {
    "1234": {"balance": 1000, "pin": "1111"},
    "5678": {"balance": 500, "pin": "2222"},
}


# endpoint for login: verifies account number and PIN.
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    accountNumber = data.get('accountNumber')
    pin = data.get('pin')

    if accountNumber not in accounts:
        return jsonify({"error": "Account not found"}), 404
    if accounts[accountNumber]["pin"] != pin:
        return jsonify({"error": "Invalid PIN"}), 400

    # If successful, return a success message
    return jsonify({"status": "success", "accountNumber": accountNumber}), 200


# endpoint for get_balance
@app.route('/api/balance/<accountNumber>', methods=['GET'])
def get_balance(accountNumber):
    if accountNumber not in accounts:
        return jsonify({"error": "Account not found"}), 404
    return jsonify({
        "accountNumber": accountNumber,
        "balance": accounts[accountNumber]["balance"]
    }), 200

# endpoint for withdraw
@app.route('/api/withdraw', methods=['POST'])
def withdraw():
    data = request.get_json()
    accountNumber = data.get('accountNumber')
    amount = data.get('amount')

    if accountNumber not in accounts:
        return jsonify({"error": "Account not found"}), 404
    if amount is None or amount <= 0:
        return jsonify({"error": "Invalid withdrawal amount"}), 400
    if accounts[accountNumber]["balance"] < amount:
        return jsonify({"error": "Insufficient balance"}), 400

    accounts[accountNumber]["balance"] -= amount
    return jsonify({
        "status": "success",
        "accountNumber": accountNumber,
        "balance": accounts[accountNumber]["balance"]
    }), 200

# endpoint for deposit
@app.route('/api/deposit', methods=['POST'])
def deposit():
    data = request.get_json()
    accountNumber = data.get('accountNumber')
    amount = data.get('amount')

    if accountNumber not in accounts:
        return jsonify({"error": "Account not found"}), 404
    if amount is None or amount <= 0:
        return jsonify({"error": "Invalid deposit amount"}), 400

    accounts[accountNumber]["balance"] += amount
    return jsonify({
        "status": "success",
        "accountNumber": accountNumber,
        "balance": accounts[accountNumber]["balance"]
    }), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
