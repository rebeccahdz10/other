var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Bellatrix25",
    database: "bamazon"
});

connection.connect(function (err, res) {
    if (err) throw err;
    readData();
});

function readData() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log("-----------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + "|" + res[i].product + "|" + res[i].department + "|" + "$" + res[i].price.toFixed(2) + "|" + res[i].stock + "ct");
        }
        console.log("-----------------------------------");

        inquirer
            .prompt([
                {
                    type: "number",
                    message: "Please enter the ID of the product you want to buy.",
                    name: "product"
                },
                {
                    type: "number",
                    message: "How many do you want to buy?",
                    name: "amount"
                }
            ])

            .then(function (inquirerResponse) {
                console.log(inquirerResponse.product);
                console.log(inquirerResponse.amount);

                if (inquirerResponse.product > 10) {
                    console.log('message:', "That is not a valid choice, try again!")
                }

            });


        connection.end();
    });
}
