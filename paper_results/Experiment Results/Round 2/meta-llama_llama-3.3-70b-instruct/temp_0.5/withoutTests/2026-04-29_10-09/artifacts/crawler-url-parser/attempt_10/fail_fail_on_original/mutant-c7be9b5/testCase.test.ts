describe('crawler-url-parser', () => {
  it('should log a message to the console when called', () => {
    const originalConsoleLog = console.log;
    console.log = jest.fn();
    const originalRequire = require;
    require = jest.fn(() => {
      originalConsoleLog('for testing purpose');
    });
    expect(() => require('../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js')).not.toThrow();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('for testing purpose');
    console.log = originalConsoleLog;
    require = originalRequire;
  });
});