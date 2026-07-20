const fs = require('fs');
const path = require('path');

describe("Delta", () => {
  it("should have a module.exports that is not empty when run in a CommonJS environment", () => {
    const filePath = path.join(__dirname, '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    expect(fileContent).toContain('if (typeof module === \'object\')');
  });
});