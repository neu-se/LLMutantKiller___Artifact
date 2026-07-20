import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse URL with fragment', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager#installation";
    const parsedUrl = parse(url);
    if (parsedUrl === null) {
      throw new Error('Parsed URL is null');
    }
    expect(parsedUrl.search).toBeNull();
  });
});