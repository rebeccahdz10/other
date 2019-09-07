var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "bamazon"
});

function startApp() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log("-----------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + "|" + res[i].product + "|" + res[i].department + "|" + "$" + res[i].price.toFixed(2) + "|" + res[i].stock + "ct");
        }
        console.log("-----------------------------------");

        var stock = "SELECT * FROM products WHERE ?"

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
                console.log("Your stock ID chosen: ", inquirerResponse.product);
                console.log("Amount in your cart: ", inquirerResponse.amount);

                if (inquirerResponse.amount > stock) {
                    console.log('message:', "That is not a valid choice, try again!")
                }
            })

        connection.end();
    });
}
startApp();