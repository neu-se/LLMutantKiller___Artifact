import { parse } from '../crawler-url-parser';

describe('parse function', () => {
  it('should not throw an error when called with a valid URL', () => {
    const url = 'https://www.npmjs.com/package/electron-window-manager';
    expect(() => parse(url)).not.toThrow();
  });
});