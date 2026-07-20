import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse URL with fragment', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager#installation";
    const parsedUrl = parse(url);
    expect(parsedUrl).not.toBeNull();
    expect(parsedUrl.search).toBeUndefined();
  });
});