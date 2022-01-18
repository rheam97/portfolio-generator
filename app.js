const inquirer = require("inquirer")
// const fs  = require("fs");
// const { generate } = require("rxjs");
// const generatePage = require("./src/page-template.js")

// const pageHTML = generatePage(user, github)


// fs.writeFile('index.html', pageHTML, err => {
//     if(err) throw err
//     console.log('Portfolio complete! Check out index.html to see the output')
// })
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if (nameInput) {
                    return true
                }
                else {
                    console.log("Please enter your name!")
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your GitHub?',
            validate: gitInput => {
                if (gitInput) {
                    return true
                }
                else {
                    console.log("Please enter your Github!")
                    return false
                }
            }
        },
        {
            type: "confirm",
            name: "confirmAbout",
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true
                }
                else {
                    return false
                }
            }
        }
    ])
}

const promptProject = portfolioData => {
    console.log(`
    =================
    Add a New Project
    =================
    `);
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: projectNameInput => {
                if (projectNameInput) {
                    return true
                }
                else {
                    console.log("Please enter your project name!")
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descInput => {
                if (descInput) {
                    return true
                }
                else {
                    console.log("Please enter your project description!")
                    return false
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: hubInput => {
                if (hubInput) {
                    return true
                }
                else {
                    console.log("Please enter your github link!")
                    return false
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ]).then(projectData => {
        console.log(portfolioData)
        portfolioData.projects.push(projectData)
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData)
        }
        else {
            return portfolioData
        }
    })
}
promptUser()
    .then(promptProject)
    .then(portfolioData => console.log(portfolioData))


