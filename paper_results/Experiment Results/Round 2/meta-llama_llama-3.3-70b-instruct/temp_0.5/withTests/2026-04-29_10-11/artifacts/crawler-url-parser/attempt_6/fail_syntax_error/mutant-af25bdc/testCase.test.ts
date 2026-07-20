import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('Test the parse function with a specific URL string', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const url = 'http://www.stackoverflow.com';
    const result = parse(url);
    const originalConsoleLog = console.log;
    let logCalled = false;
    console.log = () => {
      logCalled = true;
    };
    // run the original code
    const originalCode = require../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js;
    originalCode;
    expect(logCalled).toBe(true);
    console.log = originalConsoleLog;
  });
});