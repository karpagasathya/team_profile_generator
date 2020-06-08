const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const teamMembers = [];
const idArr = [];

const generateTeam = () => {
  const createManager = () => {
    console.log("Welcome!")
    console.log("Please build your Engineering team");
    inquirer
      .prompt([
        {
          type: "input",
          name: "managerName",
          message: "What is your manager's name?",
          validate: (answer) => {
            if (answer === "") {
              return "enter a valid name.";  
            }
             return true;
          },
        },
        {
          type: "input",
          name: "managerId",
          message: "What is your manager's id?",
          validate: (answer) => {
            if (isNaN(answer) || answer < 1) {
              return "enter a number greater than zero.";
            }
            return true;
          },
        },
        {
          type: "input",
          name: "managerEmail",
          message: "What is your manager's email?",
          validate: (answer) => {
            // got this regular expression email validation from stackoverflow https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
            if (answer.match(/\S+@\S+\.\S+/)) {
              return true;
            }
            return "enter a valid email address.";
          },
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "What is your manager's office number?",
          validate: (answer) => {    
            if (isNaN(answer) || answer < 1) {
               return "enter a number greater than zero.";
            }
            return true;
          },
        },
      ])
      .then((answers) => {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
        // console.log(manager);
        teamMembers.push(manager);
        idArr.push(answers.managerId);
        createTeam();
      });
  };


  const createTeam = () => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Which type of team member would you like to add?",
          choices: ["Engineer", "Intern", "I don't want to add any more team members"],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case "Engineer":
            newEngineer();
            break;
          case "Intern":
            newIntern();
            break;
          default:
            renderHtml();
        }
      });
  };


  // Engineer function
  const newEngineer = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engineerName",
          message: "What is your engineer's name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "enter a valid name.";
          },
        },
        {
          type: "input",
          name: "engineerId",
          message: "What is your engineer's id?",
          validate: (answer) => {
            if (isNaN(answer) || answer < 1) {
              return "enter a number greater than zero";
            }
             else if (idArr.includes(answer)) {
                return "ID is already taken. Enter a different one.";
              } else {
                return true;
              }
          },
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "What is your engineer's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "enter a valid email address.";
          },
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "What is your engineer's GitHub username?",
          validate: (answer) => {
            if (answer === "") {
              return "enter a valid github username.";
            }
              return true;
          },
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
        // console.log(engineer);
        teamMembers.push(engineer);
        idArr.push(answers.engineerId);
        createTeam();
      });
  };


  // Intern function
  const newIntern = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "What is your intern's name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "enter a valid name.";
          },
        },
        {
          type: "input",
          name: "internId",
          message: "What is your intern's id?",
          validate: (answer) => {
           if (isNaN(answer) || answer < 1) {
             return "enter a number greater than zero.";
           } else if (idArr.includes(answer)) {
             return "ID is already taken. Enter a different one.";
           } else {
             return true;
           }
          },
        },
        {
          type: "input",
          name: "internEmail",
          message: "What is your intern's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "enter a valid email address.";
          },
        },
        {
          type: "input",
          name: "internSchool",
          message: "What is your intern's school?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "enter a valid school name.";
          },
        },
      ])
      .then((answers) => {
        const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        // console.log(intern);
        teamMembers.push(intern);
        idArr.push(answers.internId);
        createTeam();
      });
  };

  const renderHtml = () => {
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8", (err) => {
      if (err) throw err;
      console.log("Engineering Team is Generated!");
    });
  };

  createManager();
};

generateTeam();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
