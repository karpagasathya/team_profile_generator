# Team Profile Generator
![](https://img.shields.io/badge/License-MIT-important)
![badge](https://img.shields.io/github/languages/top/karpagasathya/team_profile_generator)

This is a Command-Line Interface (CLI) application that allows the user to create a team profile HTML page that displays the Manager, Engineers, and Interns of an engineering team. Based on the information the user has given, a team profile is created with the info of all the members. 

## Technology and Features Used

* Bootstrap
* Javascript
* ES6+ (constructors, class, object)
* Node.js
* NPM Modules: Inquirer, Jest​


## Table of Contents

1. [Installation](#Installation)
2. [Usage](#Usage)
3. [Contributing](#Contributing)
4. [Tests](#Tests)
5. [License](#licence)

## Installation

 * Clone the repository to your local device
 * Install the necessary npm packages by typing in the following command in the terminal:

 ```
 npm install
 ```

 ## Usage

 * In the terminal, invoke the application with the following command:
 ```
 node app.js
 ```
 * Then answer each of the prompts for information about the Manager, Engineer(s), and Intern(s).Each of these roles will require different (role-specific) information such as,
   * **Manager** will require: name, ID, email address, and office number
   * **Engineer(s)** will require: name, ID, email address, and GitHub username
   * **Intern(s)** will require: name, ID, email address, and the name of their school

* When the user finishes answering all of the prompts in the terminal, the HTML file will be generated. Open the team.html file to view the output.

## Contributing

Contributions are welcome. You can create an issue or submit 

## Test

* TDD (test driven-development) is used for testing. In this application [Jest](https://jestjs.io/) testing framework is used. 
* To run tests, run the following command;
```
npm run test
```

## License

[MIT](license.txt) license