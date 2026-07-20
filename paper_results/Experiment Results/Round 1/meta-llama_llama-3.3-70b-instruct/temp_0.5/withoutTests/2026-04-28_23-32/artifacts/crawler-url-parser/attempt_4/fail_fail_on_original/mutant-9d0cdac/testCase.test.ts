import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly handle URLs without protocols', () => {
    const url = "www.npmjs.com/package/electron-window-manager";
    const resultOriginal = parse(url);
    expect(resultOriginal).not.toBeNull();
    expect(resultOriginal.url).toBe('http://www.npmjs.com/package/electron-window-manager');
    const urlMutated = "npmjs.com/package/electron-window-manager";
    const resultMutated = parse(urlMutated);
    expect(resultMutated).toBeNull();
  });
});