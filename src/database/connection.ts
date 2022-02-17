import { createConnection } from "typeorm";

createConnection().then(
    async () => {console.log("TypeOrm Conected !")})
    .catch(error => console.log(error));