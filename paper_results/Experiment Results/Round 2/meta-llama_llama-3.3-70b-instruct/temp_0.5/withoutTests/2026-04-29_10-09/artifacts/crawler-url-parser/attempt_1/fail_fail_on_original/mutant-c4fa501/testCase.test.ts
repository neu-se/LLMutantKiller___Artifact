import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly parse URL and remove directory index', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager/index.html";
    const parsedUrl = parse(url);
    expect(parsedUrl.url).toBe("https://www.npmjs.com/package/electron-window-manager");
    expect(parsedUrl.path).toBe("/package/electron-window-manager");
  });
});