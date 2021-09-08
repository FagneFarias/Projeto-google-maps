const {Client} = require('pg');
const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
});

client.connect()
    .then(()=> console.log("Conectado com o postgres"))
    .catch(err => console.log(err.stack));


    const addPonto = (request, response) =>{
        const {nome, email, lat, lng} = request.body;
    
        const query = `INSERT INTO pontos (nome, email, loc) VALUES ('${nome}','${email}', ST_GeomFromText('POINT(${lat} ${lng})'))`;
    
        client.query(query,(error, results) => {
                if(error){
                    response.status(400).send(error);
                    console.log(error);
                    return;
                }
                response.status(200).send('Inserido');
            });
    };

    const getPontos= (request, response) => {

        client.query('SELECT nome, email, ST_x(loc), ST_y(loc) FROM pontos',(err, results) => {
            
            if (err) {
                response.status(400).send(err);
            } else {
                response.status(200).json(results.rows);
            }
    
        });
    }
    
    module.exports = {
        addPonto,
        getPontos
    };