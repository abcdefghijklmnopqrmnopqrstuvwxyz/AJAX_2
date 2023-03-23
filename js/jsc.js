class Coin
{
    static list = [];

    constructor(id, symbol, name)
    {
        this.id = id;
        this.symbol = symbol;
        this.name = name;
    }
}

function tryServerSatus()
{
    $.ajax({
        url: "https://api.coingecko.com/api/v3/ping",
        header: {"":""},
        method: "GET",
        success: function(data){
            $("#status").append("Server status: &nbsp<p>okay<p>");
            $("p").css("color", "green");
            getCoinData();
        },
        error: function(error){
            $("#status").append("Server status: &nbsp<p>down<p>");
            $("p").css("color", "red");
        }
    });
}

function getCoinData()
{
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/list",
        header: {"":""},
        method: "GET",
        success: function(data){
            $("#error").empty();
            Coin.list = [];
            for (let i = 0; i < 30; i++)
            {
                Coin.list.push(new Coin(data[i].id, data[i].symbol, data[i].name));
            }
            createTable();
        },
        error: function(error){
            $("#error").append('<div class="alert alert-danger" role="alert">Service currently unaviable, try again later!</div>');
        }
    });
}

function createTable()
{
    $("#table").empty();
    for(let i = 0; i < Coin.list.length; i++)
    {
        $("#table").append('<tr><th scope="row">' + i + '</th><td>' + Coin.list[i].id + '</td><td>' + Coin.list[i].symbol + '</td><td>' + Coin.list[i].name + '</td></tr>');
    }
}

//https://api.jquery.com/Jquery.ajax/
window.onload = tryServerSatus();