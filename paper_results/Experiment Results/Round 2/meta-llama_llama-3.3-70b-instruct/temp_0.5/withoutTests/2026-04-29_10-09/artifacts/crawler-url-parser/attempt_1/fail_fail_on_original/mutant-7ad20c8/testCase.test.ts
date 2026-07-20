import { parse } from '../crawler-url-parser';

describe('parse function', () => {
  it('should not log anything to the console', () => {
    const originalConsoleLog = console.log;
    console.log = jest.fn();
    parse('https://www.npmjs.com/package/electron-window-manager');
    expect(console.log).not.toHaveBeenCalled();
    console.log = originalConsoleLog;
  });
});