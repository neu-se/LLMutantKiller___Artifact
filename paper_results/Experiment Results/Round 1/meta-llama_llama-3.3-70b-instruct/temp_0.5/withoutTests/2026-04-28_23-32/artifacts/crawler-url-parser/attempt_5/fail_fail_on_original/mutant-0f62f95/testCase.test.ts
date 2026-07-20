import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should not print to console when running as a module', () => {
    const originalConsoleLog = console.log;
    console.log = jest.fn();
    const url = "https://www.npmjs.com/package/electron-window-manager";
    // The mutated code will run the console.log statement because module.parent is truthy
    // The original code will not run the console.log statement because module.parent is falsy
    // So we need to check if console.log is called when module.parent is truthy
    module.parent = {};
    parse(url);
    expect(console.log).not.toHaveBeenCalled();
    module.parent = undefined;
    console.log = originalConsoleLog;
  });
});