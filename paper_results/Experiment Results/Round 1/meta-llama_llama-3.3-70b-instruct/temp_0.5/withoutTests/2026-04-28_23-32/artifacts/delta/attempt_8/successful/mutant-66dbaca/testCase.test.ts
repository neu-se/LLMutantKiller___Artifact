const fs = require('fs');
const path = require('path');

describe('Delta', () => {
  it('should have a valid export statement in its source file', () => {
    const filePath = path.join(__dirname, '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    expect(fileContent).toContain('module.exports = Delta;');
    expect(fileContent).toContain('module.exports.default = Delta;');
  });
});