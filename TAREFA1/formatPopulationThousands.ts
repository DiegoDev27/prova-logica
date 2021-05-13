// 1 - Crie um programa que formate a coluna "População no último censo" do arquivo "mapa.csv" e grave uma cópia do arquivo alterado. Formate com 0 casas decimais e separador de milhar. Ex.: 90000 => 90.000

import * as fs from "fs";

const csv = fs.readFileSync('/home/diego/prova-logica/mapa.csv');
const csvSplitted = csv.toString().split('\n');

const csvPopulationWithDot = convertNumbersToThousands(csvSplitted);
const csvToString = arrayToString(csvPopulationWithDot);

saveFile('formattedMap.csv', csvToString);



function convertNumbersToThousands(arrayCsv: string[]): string[] {

    let arrayResult = arrayCsv.map((x) => {
        if (!x || !x.trim()) {
            return;
        }
        const separateElements = x.split(';');
        const num = separateElements[1];

        const formattedNum = num.replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1.');

        return separateElements[0] + ';' + formattedNum;
    });

    arrayResult = arrayResult.filter((x) => x);

    return arrayResult as string[];
}


function arrayToString(arrayCsv: string[]): string {
    let formattedCsvPopulation = '';

    for (let i = 0; i <= arrayCsv.length - 1; i++) {
        formattedCsvPopulation += arrayCsv[i] + '\n';
    }

    return formattedCsvPopulation;
}


function saveFile(name: string, date: any) {
    fs.writeFile(name, date, (err) => {
        if (err) throw err;
        console.log('O arquivo foi gerado com sucesso!');
    });
}