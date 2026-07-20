#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';

export function parseTable(content: string): { headers: string[], rows: string[][] } {
  const lines = content.split('\n').filter(line => 
    line.trim() && !line.startsWith('+') && !line.startsWith('=')
  );
  
  const parseRow = (line: string): string[] => 
    line.split('|').slice(1, -1).map(cell => cell.trim());
  
  const headers = parseRow(lines[0]);
  const rows = lines.slice(1).map(parseRow);
  
  // Filter out unwanted columns
  const excludeColumns = [
    'fail_syntax_error',
    'fail_fail_on_original',
    'fail_pass_on_mutation',
    'fail_forbidden_libraries',
  ];
  const filteredHeaders = headers.filter(h => !excludeColumns.includes(h));
  const excludeIndices = headers.map((h, i) => excludeColumns.includes(h) ? i : -1).filter(i => i !== -1);
  const filteredRows = rows.map(row => row.filter((_, i) => !excludeIndices.includes(i)));
  
  return { headers: filteredHeaders, rows: filteredRows };
}

function addCommas(num: number): string {
  return num.toLocaleString();
}

export function generateLatex(headers: string[], rows: string[][], captionText: string = 'Mutants killed by \\ToolName.', captionLabel: string = 'table:results'): string {
  const colSpec = 'l|r||' + 'r|'.repeat(headers.length - 3) + 'r';
  
  const headerRow1 = headers.map((h, i) => {
    if (i === 0) return `{\\bf ${h.replace(/ /g, '\\ ')}}`;
    if (h.includes('attempt_')) return `\\Iteration{${h.match(/\d+/)?.[0] || ''}}`;
    if (h === 'total successes') return '\\TotalKilledInAllIterations';
    if (h === 'time') return '\\ToolTime';
    if (h === 'tokens_in') return '\\TokensIn';
    if (h === 'tokens_out') return '\\TokensOut';
    if (h === '#Tested mutants') return '\\rotatebox{90}{{\\bf \\#surviving mutants}}';
    return `{\\bf ${h.replace(/_/g, '\\ ').replace(/#/g, '\\#')}}`;
  }).join(' \n    & ');

  const headerRow2 = headers.map((h, i) => {
    return '';
  }).join(' \n    & ');

  const headerRow3 = [
    '',
    '',
    '\\multicolumn{11}{c|}{\\bf \\#surv. mutants killed}',
    '\\multicolumn{3}{c}{\\bf cost}'
  ].join(' \n    & ');

  const dataRows = rows.map((row, rowIndex) => {
    const formattedRow = row.map((cell, i) => {
      if (i === 0) return `\\textit{${cell}}`;
      if (cell === '') return '0';
      if (i === headers.findIndex(h => h === 'total successes') && row[1]) {
        const total = parseInt(cell);
        const tested = parseInt(row[1]);
        const percent = ((total / tested) * 100).toFixed(1);
        return `${total} (${percent}\\%)`;
      }
      if (headers[i] === 'time') {
        return parseFloat(cell).toFixed(0);
      }
      if (headers[i] === 'tokens_in' || headers[i] === 'tokens_out') {
        return `\\hfill ${addCommas(parseFloat(cell))}`;
      }
      return cell;
    }).join(' \n      & ');
    
    const isLastRow = rowIndex === rows.length - 1;
    return formattedRow + ' \n      \\\\' + (isLastRow ? '' : ' \n\\hline');
  });

  const formattedDataRows = dataRows.map((row, i) => {
    if (i === dataRows.length - 1) {
      return '\\hline\n  ' + row.replace(/^/, '');
    }
    return '  ' + row.replace(/^/, '');
  }).join('\n');

  return `\\begin{table*}[hbt!]
\\centering
{\\scriptsize
\\begin{tabular}{${colSpec}}
  ${headerRow3} \\\\
  ${headerRow1} \\\\
  ${headerRow2} \\\\
  \\hline
  \\hline
${formattedDataRows}
\\end{tabular}
  }
  \\\\[2mm]
  \\caption{${captionText}}
  \\label{${captionLabel}}
\\end{table*}`;
}

function main() {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    console.error('Usage: node table-to-latex.js <input.txt> <output.tex>');
    process.exit(1);
  }

  const [inputFile, outputFile] = args;
  const content = fs.readFileSync(inputFile, 'utf-8');
  const { headers, rows } = parseTable(content);
  const latex = generateLatex(headers, rows, 'Mutants killed by \\ToolName.', 'table:results');
  
  fs.writeFileSync(outputFile, latex);
  console.log(`LaTeX table written to ${outputFile}`);
}

if (require.main === module) {
  main();
}
