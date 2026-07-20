import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should not execute the code block when module is not the main module', () => {
    const originalConsoleLog = global.console.log;
    global.console.log = jest.fn();
    require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    expect(global.console.log).not.toHaveBeenCalledWith("for testing purpose");
    global.console.log = originalConsoleLog;
  });
});