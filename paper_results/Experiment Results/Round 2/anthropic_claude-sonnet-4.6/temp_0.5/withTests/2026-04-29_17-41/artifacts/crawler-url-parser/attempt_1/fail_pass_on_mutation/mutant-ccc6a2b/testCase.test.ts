import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser module', () => {
  it('should return null when parsing a URL with illegal characters (space in URL)', () => {
    // The URL "https ://www.npmjs.com/package/electron-window-manager" contains a space
    // which is an illegal character, so parse should return null
    const result = parse("https ://www.npmjs.com/package/electron-window-manager");
    expect(result).toBeNull();
  });
});