const fs = require('fs').promises;
const path = require('path');

const databases = [
    {
        url: "hhttps://microcad.blob.core.windows.net/confro2000/sicar/SE.zip",
        localPath: path.join(__dirname, "./layers/SICAR_SE_1.js")
    },
    {
        url: "https://microcad.blob.core.windows.net/confro2000/sicar/PB.zip",
        localPath: path.join(__dirname, "./layers/SICAR_PB_2.js")
    },
    {
        url: "https://microcad.blob.core.windows.net/confro2000/sicar/PE.zip",
        localPath: path.join(__dirname, "./layers/SICAR_PE_3.js")
    }, 
    {
        url: "https://microcad.blob.core.windows.net/confro2000/sicar/AL.zip",
        localPath: path.join(__dirname, "./layers/SICAR_AL_4.js")
    },
    {
        url: "https://microcad.blob.core.windows.net/confro2000/sicar/BA.zip",
        localPath: path.join(__dirname, "./layers/SICAR_BA_5.js")
    },
    {
        url: "https://microcad.blob.core.windows.net/confro2000/sicar/RN.zip",
        localPath: path.join(__dirname, "./layers/SICAR_RN_6.js")
    },
    {
        url: "https://microcad.blob.core.windows.net/confro2000/sicar/CE.zip",
        localPath: path.join(__dirname, "./layers/SICAR_CE_7.js")
    },
    {
        url: "https://microcad.blob.core.windows.net/confro2000/sicar/MA.zip",
        localPath: path.join(__dirname, "./layers/SICAR_MA_8.js")
    },
    {
        url: "https://microcad.blob.core.windows.net/confro2000/sicar/PI.zip",
        localPath: path.join(__dirname, "./layers/SICAR_PI_9.js")
    }
    // {...}
];

async function updateAllDatabases() {
    for (const db of databases) {
        try {
            const response = await fetch(db.url);

            if (!response.ok) {
                console.error(`Falha ao acessar o blob: ${db.url}. Status: ${response.status}`);
                continue;
            }

          
            const remoteData = await response.json();

          
            let localData;
            try {
                const localFileData = await fs.readFile(db.localPath, 'utf8');
                localData = JSON.parse(localFileData);
            } catch {
                localData = null; 
            }

            //Comparação_por_diferença
            if (JSON.stringify(localData) !== JSON.stringify(remoteData)) {
                await fs.writeFile(db.localPath, JSON.stringify(remoteData, null, 2));
                console.log(`Database '${db.localPath}' atualizada com sucesso.`);
            } else {
                console.log(`Database '${db.localPath}' já está atualizada.`);
            }

        } catch (error) {
            console.error(`Erro ao atualizar a database '${db.localPath}':`, error);
        }
    }
}


updateAllDatabases();
