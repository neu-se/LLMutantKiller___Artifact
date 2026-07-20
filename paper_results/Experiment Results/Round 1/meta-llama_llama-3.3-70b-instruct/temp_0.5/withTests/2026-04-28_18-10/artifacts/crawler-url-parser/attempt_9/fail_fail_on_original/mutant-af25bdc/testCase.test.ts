import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should call console.log with the correct message', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    parse('https://www.npmjs.com/package/electron-window-manager');
    expect(consoleLogSpy).toHaveBeenCalledWith('for testing purpose');
  });
});