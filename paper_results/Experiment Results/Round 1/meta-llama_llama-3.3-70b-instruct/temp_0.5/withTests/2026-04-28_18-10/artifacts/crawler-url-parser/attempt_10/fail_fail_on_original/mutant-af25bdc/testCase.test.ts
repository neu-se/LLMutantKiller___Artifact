import { parse } from '../../crawler-url-parser';

describe('parse function', () => {
  it('should return a non-null value when given a valid URL', () => {
    const url = 'https://www.npmjs.com/package/electron-window-manager';
    const result = parse(url);
    expect(result).not.toBeNull();
  });
});