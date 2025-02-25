
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
Elaboration about running the code locally on your machine is in the bottom of this README file.

### Usage:

Currently the system holds 2 users on the server's memory. 
Account number 1234 , PIN 1111
Account number 5678 , PIN 2222

### Approach and Decisions

First, I sketched a loose and simplified class diagram to represent the system components - A server and a client. The server serves the client's needs. for instance if the client wants to check his balance, he approaches the server which holds this information for him. I figured that the client's information will be stored in the server (account) but the client himself doesn't exist in the system as an instance, rather he needs the interface to perform his tasks. 
I chose to program the server-side on Flask after conducting a short research about backend frameworks in Python. I was unfamiliar with frontend-development prior to this assignment, therefore I had to research frontend frameworks, and I chose React because of the popularity of the framework. 
Most of the decisions I made were frontend-related as it was subject to interpretation. I decided to make a "simulation" like prototype, to enhance the user experience as much as possible in the boundaries of the deadline. In addition, I added a PIN authentication feature, which serves as another layer of realism to the system, and another level of security.
The server is hosted on AWS EC2 which is not too difficult to deploy, apparently, although I did struggle with quite a few technical challenges after deployment.
When deploying I used tmux for persistent server hosting. I organized the project as a monorepo, and used git and Github for version control. 
In the future, the ATM might have enhanced frontend mechanisms, including credit card insertion and banknotes withdrawal animation, while the backend might be improved by integrating a database to hold the accounts or hashing the PINs of the users for increased security from potential hackers.  
### Challenges

This assignment was a huge challenge for me. I have practically never developed frontend applications, Nevermind deploying a server onto a cloud service.
Thankfully, the author of the assignment permitted the use of documentations, forums, and AI tools. 
Through determination, self-study, Youtube tutorials, forums, and AI, I have learned a lot about the actual process of developing and engineering a software.
I am happy to say that I am proud of the final product I achieved within the very limited timeframe.






### To Run the system locally:

Clone this repository into your machine:

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
Your machine needs Node.js installed.

#### How to run
Open 2 terminals, one for the backend and one for the frontend. Alternatively, you can use a tool like tmux.
Deploying the server locally: (backend)
Activate your environment.
In the first terminal type:
```bash
cd your-pc-path\atm-machine\backend
python app.py
```
This should run the backend application and open a local host server listening on port 5000.

Running  the application: (frontend)
in the frontend terminal type:
```bash
cd your-pc-path\atm-machine\frontend
npm start
```
This should open your default browser with a localhost IP with port 3000 and the application should be up and running.




