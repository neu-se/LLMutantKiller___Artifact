import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should not log anything to the console', () => {
    // Arrange
    const consoleLog = console.log;
    console.log = jest.fn();
    const currentUrlStr = 'https://www.example.com';
    const baseUrlStr = undefined;

    // Act
    parse(currentUrlStr, baseUrlStr);

    // Assert
    expect(console.log).not.toHaveBeenCalled();
    console.log = consoleLog;
  });
});