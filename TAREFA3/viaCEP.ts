// 3 - Preencha o endereco no arquivo "CEPs.csv" lendo a coluna de cep e buscando na API viacep (https://viacep.com.br/) a cidade e o bairro equivalente ao CEP e grave uma cópia do arquivo preenchido.

import * as fs from "fs";
import axios from "axios";

const csv = fs.readFileSync('/home/diego/prova-logica/CEPs.csv');
const csvSplitted = csv.toString().split('\n');


let object = toObject(csvSplitted);
object = object.slice(1, object.length);

objectData(object).then((x) => {
    const adressList = x;

    let resultViaCep = csvSplitted[0] + '\n';
    resultViaCep += toArrayString(adressList);

    saveFile('viaCEP.csv', resultViaCep);
});



async function objectData(address: any[]): Promise<any[]> {

    const resultAdressList = [];
    for (let i = 0; i <= address.length - 1; i++) {
        const response = await viaCepRequest(address[i].cep);
        resultAdressList.push({
            cep: response.cep || '',
            logradouro: response.logradouro || '',
            complemento: response.complemento || '',
            bairro: response.bairro || '',
            localidade: response.localidade || '',
            uf: response.uf || '',
            unidade: response.unidade || '',
            ibge: response.ibge || '',
            gia: response.gia || '',
        });
    }
    return resultAdressList;
}


async function viaCepRequest(cep: string): Promise<any> {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
}


function toArrayString(obj: any[]): string {
    let csvString = '';
    obj.forEach((x) => {
        csvString += `${x.cep};${x.logradouro};${x.complemento};${x.bairro};${x.localidade};${x.uf};${x.unidade};${x.ibge};${x.gia}\n`;
    });

    return csvString;
}


function toObject(lists: string[]): any[] {
    let obj = lists.map((x) => {
        if (!x || !x.trim()) {
            return;
        }

        const separateElements = x.split(';');
        let formatCEP = separateElements[0].replace(' ', '').replace('-', '');

        if (formatCEP.length < 8) {
            formatCEP = '0' + formatCEP;
        }

        formatCEP = formatCEP.slice(0, 5) + '-' + formatCEP.slice(5, formatCEP.length);

        return {
            cep: formatCEP,
            logradouro: separateElements[1],
            complemento: separateElements[2],
            bairro: separateElements[3],
            localidade: separateElements[4],
            uf: separateElements[5],
            unidade: separateElements[6],
            ibge: separateElements[7],
            gia: separateElements[8]
        };
    });

    obj = obj.filter((x) => x);

    return obj;
}


function saveFile(name: string, date: any) {
    fs.writeFile(name, date, (err) => {
        if (err) throw err;
        console.log('O arquivo foi gerado com sucesso!');
    });
}