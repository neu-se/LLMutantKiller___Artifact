const fs = require('fs');
const path = require('path');

describe('Complex', () => {
  it('should have a sech function that returns a non-undefined value', () => {
    const complexJsFile = fs.readFileSync(path.join(__dirname, 'complex.js'), 'utf8');
    const sechFunctionIndex = complexJsFile.indexOf('sech');
    expect(sechFunctionIndex).not.toBe(-1);
    const sechFunctionEndIndex = complexJsFile.indexOf('}', sechFunctionIndex);
    const sechFunctionCode = complexJsFile.substring(sechFunctionIndex, sechFunctionEndIndex + 1);
    expect(sechFunctionCode).not.toContain('function sech() {}');
  });
});