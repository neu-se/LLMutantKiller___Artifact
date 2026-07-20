const fs = require('fs');
const path = require('path');

describe('parse function', () => {
  it('should not log anything to the console when the module is required as a module', () => {
    const filePath = path.join(__dirname, './crawler-url-parser.js');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const originalConsoleLog = console.log;
    console.log = jest.fn();
    eval(fileContent);
    expect(console.log).not.toHaveBeenCalled();
    console.log = originalConsoleLog;
  });
});