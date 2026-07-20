import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should not log anything to the console when called multiple times', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    parse('https://www.npmjs.com/package/electron-window-manager');
    parse('https://www.npmjs.com/package/electron-window-manager');
    expect(consoleLogSpy).toHaveBeenCalledTimes(0);
    consoleLogSpy.mockRestore();
  });
});