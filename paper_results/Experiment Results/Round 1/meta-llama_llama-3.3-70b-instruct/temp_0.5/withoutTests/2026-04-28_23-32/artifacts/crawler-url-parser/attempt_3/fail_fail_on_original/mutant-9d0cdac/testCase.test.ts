import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly handle URLs without protocols', () => {
    const url = "localhost/package/electron-window-manager";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://localhost/package/electron-window-manager');
  });
});