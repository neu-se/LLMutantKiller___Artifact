import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should log a message when executed as a standalone script', () => {
    const originalLog = console.log;
    const logSpy = jest.fn();
    console.log = logSpy;
    // Load the module and execute it
    require('../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    console.log = originalLog;
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith("for testing purpose");
  });
});