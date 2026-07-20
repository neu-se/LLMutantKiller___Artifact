import { parse } from '../../crawler-url-parser.js';

describe('parse function', () => {
  it('should log a message to the console when the original code is executed', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    // assuming the original code has a console.log statement
    parse('https://www.npmjs.com/package/electron-window-manager');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('for testing purpose');
  });
});