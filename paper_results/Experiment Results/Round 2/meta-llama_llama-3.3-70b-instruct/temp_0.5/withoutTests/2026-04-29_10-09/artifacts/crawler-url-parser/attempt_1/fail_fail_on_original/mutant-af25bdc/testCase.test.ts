import { extract } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should log a message when run as a standalone script', () => {
    // Arrange
    const originalConsoleLog = console.log;
    let loggedMessage = '';

    // Act
    console.log = (message) => {
      loggedMessage = message;
    };
    require('../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');

    // Assert
    expect(loggedMessage).toBe('for testing purpose');

    // Clean up
    console.log = originalConsoleLog;
  });
});