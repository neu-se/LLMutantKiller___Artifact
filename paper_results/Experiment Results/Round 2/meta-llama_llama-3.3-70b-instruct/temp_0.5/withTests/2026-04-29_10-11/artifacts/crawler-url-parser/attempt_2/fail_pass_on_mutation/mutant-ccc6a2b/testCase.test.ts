import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should parse a URL correctly', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    if (result !== null) {
      expect(result.url).toBe("https://www.npmjs.com/package/electron-window-manager");
    } else {
      expect(true).toBe(false);
    }
  });
});