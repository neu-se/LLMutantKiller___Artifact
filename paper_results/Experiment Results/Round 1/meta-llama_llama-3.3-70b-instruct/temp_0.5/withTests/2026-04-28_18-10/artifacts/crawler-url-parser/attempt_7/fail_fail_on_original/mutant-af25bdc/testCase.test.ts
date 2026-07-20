import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should log "for testing purpose" to the console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    parse('https://www.npmjs.com/package/electron-window-manager');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('for testing purpose');
  });
});