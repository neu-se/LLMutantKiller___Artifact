import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly parse URL and remove directory index', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager/index.html";
    const parsedUrlOriginal = parse(url);
    const urlWithoutIndex = "https://www.npmjs.com/package/electron-window-manager";
    const parsedUrlWithoutIndex = parse(urlWithoutIndex);
    if (parsedUrlOriginal !== null && parsedUrlWithoutIndex !== null) {
      expect(parsedUrlOriginal.url).toBe(parsedUrlWithoutIndex.url);
      expect(parsedUrlOriginal.path).toBe(parsedUrlWithoutIndex.path);
    } else {
      expect(parsedUrlOriginal).not.toBeNull();
      expect(parsedUrlWithoutIndex).not.toBeNull();
    }
  });
});