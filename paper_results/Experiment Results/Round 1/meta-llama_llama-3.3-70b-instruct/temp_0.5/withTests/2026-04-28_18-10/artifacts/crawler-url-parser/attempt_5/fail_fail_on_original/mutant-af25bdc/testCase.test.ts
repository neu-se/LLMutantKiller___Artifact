import { parse } from '../../crawler-url-parser';

describe('parse function', () => {
  it('should return an object with a url property', () => {
    const url = 'https://www.npmjs.com/package/electron-window-manager';
    const result = parse(url);
    expect(result).toHaveProperty('url');
  });
});