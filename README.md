
# ATM-Machine Prototype Mini-Project

This is a simple ATM-Machine prototype mini-project. The user of the ATM may log in with a PIN code, view the account balance, deposit, and withdraw money.

## Key Features

- **Backend Server:** Built on Flask, featuring API creation and handling.
- **Frontend Interface:** Built with React and CSS, handling API requests and responses.
- **Cloud Hosting:** The application is deployed on an AWS EC2 cloud server.

## How to Run

### The Easy Way

Simply click the following link to access the hosted application:  
[http://16.170.140.44:3000/](http://16.170.140.44:3000/)

### The Hard Way

First, Clone this repository into your machine:

```bash
git clone https://github.com/yourusername/your-repo-name.git
```
#### Backend prerequisites:
Setup a virtual environment
open a new terminal and navigate to /atm-machine/backend and type the following:
```bash
pip install requirements.txt
```
this should install the required packages to run the backend server locally.

#### Frontend prerequisites:
Node.js installed

#### How to run
Open 2 terminals, one for the backend and one for the frontend. Alternatively, you can use a tool like tmux.
Deploying the server locally: (backend)
Activate your environment.
In the first terminal type:
```bash
cd your-pc-path\atm-machine\backend
python app.py

This should run the backend application and open a local host server listening on port 5000.

Running  the application: (frontend)
in the frontend terminal type:
```bash
cd your-pc-path\atm-machine\frontend
npm start

This should open your default browser with a localhost IP with port 3000 and the application should be up and running.




