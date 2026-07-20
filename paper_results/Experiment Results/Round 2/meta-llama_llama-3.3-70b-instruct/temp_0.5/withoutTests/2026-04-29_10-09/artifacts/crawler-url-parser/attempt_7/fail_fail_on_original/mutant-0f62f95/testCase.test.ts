import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should not log anything to the console when the module is required as a module', () => {
    const originalConsoleLog = console.log;
    console.log = jest.fn();
    require('../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    expect(console.log).not.toHaveBeenCalled();
    console.log = originalConsoleLog;
  });
});