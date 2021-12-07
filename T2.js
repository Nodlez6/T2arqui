const https = require('https');
exports.handler = async (event) => {
    let temperatura_actual = '';
    let uf_actual = '';
    let dolar_actual = '';
    
    const response = await new Promise((resolve, reject) => {
          const req = https.get("https://api.weatherbit.io/v2.0/current?lat=-33.45694&lon=-70.64827&key=cccc452187fc47a9aadcf69d76bc1a7f&include=minutely", function(res) {
            res.on('data', chunk => {
              temperatura_actual += chunk;
            });
           
          const req2 = https.get("https://mindicador.cl/api/uf", function(res) {
            res.on('data', chunk => {
              uf_actual += chunk;
            });
            
          const req3 = https.get("https://mindicador.cl/api/dolar", function(res) {
            res.on('data', chunk => {
              dolar_actual += chunk;
            });
            
            res.on('end', () => {
              resolve({
                  statusCode: 200,
                  body: JSON.stringify(
                    { 
                      temperatura_actual : JSON.parse(temperatura_actual)['data'][0]['temp'],
                      valor_uf_clp: JSON.parse(uf_actual)['serie'][0]['valor'],
                      valor_dolar: JSON.parse(dolar_actual)['serie'][0]['valor'],
                      crucigrama_link: 'https://www.tarkus.info/movil/crucigramas_listado.php'
                  })
              });
            });
          });
          
          
          });
      });
    });

    
    
    
    return response;
};