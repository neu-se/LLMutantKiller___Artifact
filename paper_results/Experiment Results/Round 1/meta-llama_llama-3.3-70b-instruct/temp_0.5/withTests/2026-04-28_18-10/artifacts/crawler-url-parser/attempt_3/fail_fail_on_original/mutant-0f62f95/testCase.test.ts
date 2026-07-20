import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should not execute the debugger statement when module.parent is not false', () => {
    // Arrange
    const currentUrlStr = 'https://www.example.com';
    const baseUrlStr = 'https://www.example.com';

    // Act
    const consoleDebug = console.debug;
    console.debug = jest.fn();
    parse(currentUrlStr, baseUrlStr);
    console.debug = consoleDebug;

    // Assert
    expect(console.debug).not.toHaveBeenCalled();
  });
});