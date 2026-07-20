const fs = require('fs');
const path = require('path');

describe("Complex", () => {
  it("should have the correct ES module definition", () => {
    const filePath = path.join(__dirname, 'complex.js');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    expect(fileContent.includes('Object.defineProperty(Complex, "__esModule", { "value": true });')).toBe(true);
  });
});