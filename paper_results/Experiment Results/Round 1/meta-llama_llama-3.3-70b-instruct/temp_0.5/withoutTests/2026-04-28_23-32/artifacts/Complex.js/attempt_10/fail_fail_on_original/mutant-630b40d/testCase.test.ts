const fs = require('fs');
const complexCode = fs.readFileSync('./complex.js', 'utf8');

describe("Complex", () => {
  it("should calculate abs correctly for small numbers", () => {
    const complex = eval(complexCode);
    const c = new complex(3, 4);
    const result = c.abs();
    expect(result).toBeCloseTo(5);
  });

  it("should calculate abs incorrectly for small numbers when mutated", () => {
    const mutatedComplexCode = complexCode.replace('return a * Math.sqrt(1 + b * b);', 'return a / Math.sqrt(1 + b * b);');
    const mutatedComplex = eval(mutatedComplexCode);
    const c = new mutatedComplex(3, 4);
    const result = c.abs();
    expect(result).not.toBeCloseTo(5);
  });
});