import chalk from 'chalk'
import fs from 'fs'

console.log(chalk.green(` __  ___  __  .___  ___.  __   __  \r\n|  |\/  \/ |  | |   \\\/   | |  | |  | \r\n|  \'  \/  |  | |  \\  \/  | |  | |  | \r\n|    <   |  | |  |\\\/|  | |  | |  | \r\n|  .  \\  |  | |  |  |  | |__| |__| \r\n|__|\\__\\ |__| |__|  |__| (__) (__) \r\n                                   `))


/*function pegaArquivo(caminhoDoArquivo){
    const encoding = 'utf-8'
    fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
        if(erro){
            trataErro(erro)
        }
        console.log(chalk.green(texto))
    })
}*/


//Promisses com .then()
/*function pegaArquivo(caminhoDoArquivo){
    const encoding = 'utf-8'
    fs.promises.readFile(caminhoDoArquivo,encoding)
        .then((texto) => console.log(chalk.green(texto)))
        .catch(trataErro)
}*/


//async e await
async function pegaArquivo(caminhoDoArquivo){
    try {
    const encoding = 'utf-8'
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
    return extraiLinks(texto)
    }
    catch (erro) {
        trataErro(erro)
    }
}


function trataErro(erro){
    console.log(erro)
    throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório'))
}

function extraiLinks(texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
    const capturas = [...texto.matchAll(regex)]
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
    return resultados.length !== 0 ? resultados : 'Não há links no arquivo'
}

export default pegaArquivo