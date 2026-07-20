import '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should log a message to the console when called', () => {
    const originalConsoleLog = console.log;
    console.log = jest.fn();
    require('../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('for testing purpose');
    console.log = originalConsoleLog;
  });
});