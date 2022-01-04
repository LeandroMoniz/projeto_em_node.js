//modulos externos 
const inquirer = require('inquirer')
const chalk = require('chalk')

//modulos internos
const fs = require('fs')


operation()

function operation() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'o que você deseja fazer?',
                choices: [
                    'Criar conta',
                    'Consulta Saldo',
                    'Depositar',
                    'sacar',
                    'sair',
                ],
            },
        ])
        .then((answer)  => {
           const action = answer['action']

           if(action === 'Criar conta')
           {createAccount()}
        })
        .catch((err) => console.log(err))
}


// create an account
function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))

    buildAccount()
}



function buildAccount() {
    inquirer
    .prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para sua conta',
        }
    ])
    .then((answer) => {
        console.info('accountName')


       const accountName = answer['accountName'] 
       
       if (!fs.existsSync('accounts')) {
           fs.mkdirSync('accounts')
       } 

       if (fs.existsSync(`accounts/${accountName}.json`)){
           console.log(
               chalk.bgRed.black('Esta conta já exite, escolha outra nome!'),
           )
           buildAccount()
           return
       }
       
       fs.writeFileSync(
        `accounts/${accountName}.json`, 
       '{"balance": 0}',
        function (err) {
            console.log(err)
        },
       )

        console.log(chalk.green('Parabéns sua conta foi criada'))
        operation()

    })
    .catch(err => console.log(err))
}