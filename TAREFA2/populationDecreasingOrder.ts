// 2 - Crie um programa que ordene em ordem decrescente o arquivo "mapa.csv" pela coluna "População no último censo" do arquivo, usando o algoritmo bubblesort, e grave uma cópia do arquivo alterado.

import * as fs from "fs";

const csv = fs.readFileSync('/home/diego/prova-logica/mapa.csv');
const csvSplitted = csv.toString().split('\n');

let object = toObject(csvSplitted);
object = object.slice(1, object.length);

const objectSort = sortDescending(object, 'populacao');

let resultCsvSort = csvSplitted[0] + '\n';
resultCsvSort += toArrayString(objectSort);


saveFile('csvSortedByPopulation.csv', resultCsvSort);



function toArrayString(obj: any[]): string {
    let csvString = '';
    obj.forEach((x) => {
        csvString += x.local + '; ' + x.populacao + '\n';
    });

    return csvString;
}


function toObject(lists: string[]): any[] {
    let obj = lists.map((x) => {
        if (!x || !x.trim()) {
            return;
        }

        const separateElements = x.split(';');

        return {
            local: separateElements[0],
            populacao: parseInt(separateElements[1], 10)
        };
    });

    obj = obj.filter((x) => x);

    return obj;
}


function sortDescending(obj: any[], sortField: string): any[] {
    let aux;

    for (let i = 0; i <= obj.length - 1; i++) {
        for (let j = 0; j <= obj.length - 1; j++) {
            if (obj[i][sortField] > obj[j][sortField]) {
                aux = obj[j];
                obj[j] = obj[i];
                obj[i] = aux;
            }
        }
    }

    obj = obj.filter((x) => x[sortField]);

    return obj;
}

function saveFile(name: string, date: any) {
    fs.writeFile(name, date, (err) => {
        if (err) throw err;
        console.log('O arquivo foi gerado com sucesso!');
    });
}