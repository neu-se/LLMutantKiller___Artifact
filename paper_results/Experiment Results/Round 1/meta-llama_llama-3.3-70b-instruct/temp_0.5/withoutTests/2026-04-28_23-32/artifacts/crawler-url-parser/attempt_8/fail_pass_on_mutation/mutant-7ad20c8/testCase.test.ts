import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should handle parsing of URLs correctly and return a result when called multiple times', () => {
    const result1 = parse("https://www.npmjs.com/package/electron-window-manager");
    const result2 = parse("https://www.npmjs.com/package/electron-window-manager");
    expect(result1).not.toBeNull();
    expect(result2).not.toBeNull();
  });
});