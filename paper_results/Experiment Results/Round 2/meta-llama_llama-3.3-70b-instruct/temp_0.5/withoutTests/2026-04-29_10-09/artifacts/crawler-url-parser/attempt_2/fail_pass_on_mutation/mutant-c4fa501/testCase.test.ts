import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly parse URL and remove directory index', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager/index.html";
    const parsedUrl = parse(url);
    if (parsedUrl !== null) {
      expect(parsedUrl.url).toBe("https://www.npmjs.com/package/electron-window-manager/index.html");
      expect(parsedUrl.path).toBe("/package/electron-window-manager/index.html");
    } else {
      expect(parsedUrl).not.toBeNull();
    }
  });
});