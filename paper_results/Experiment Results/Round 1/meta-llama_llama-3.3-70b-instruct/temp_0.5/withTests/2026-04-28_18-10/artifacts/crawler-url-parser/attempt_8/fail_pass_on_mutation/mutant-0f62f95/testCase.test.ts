import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should not call the debugger statement', () => {
    // Arrange
    const originalDebugger = globalThis.debugger;
    const debuggerSpy = jest.fn();
    globalThis.debugger = debuggerSpy;
    const currentUrlStr = 'https://www.example.com';
    const baseUrlStr = undefined;

    // Act
    parse(currentUrlStr, baseUrlStr);

    // Assert
    expect(debuggerSpy).not.toHaveBeenCalled();
    globalThis.debugger = originalDebugger;
  });
});