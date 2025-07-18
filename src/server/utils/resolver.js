const { readFile } = require('fs/promises');
const path  = require('path')


async function GetManifest(){
    const chemin = path.resolve('./src/client/public/assets/.vite/manifest.json');

    try {

     content = await readFile(chemin, 'utf-8');
     const manifest = JSON.parse(content)
     const result = manifest['../main.tsx']

     if(result && result.file){
        const scriptFile = result.file.toString()
        // console.log('JS FILE is : ', scriptFile)

        return scriptFile;
     }


    }catch (error){
        console.error(error)
    }

}


async function GetCSS(){
    const chemin = path.resolve('./src/client/public/assets/assets/.vite/manifest.json');
    try {
        content = await readFile(chemin, 'utf-8');
        const manifest = JSON.parse(content)
        const result = manifest['../main.tsx']
        if(result && result.css && result.css.length > 0){
            const cssFile = result.css[0].toString()
          //  console.log('CSS FILE is : ', cssFile)
            return cssFile;
        }
    }catch (error){
        console.error(error)
    }
}


module.exports = {
    GetManifest,
    GetCSS
};