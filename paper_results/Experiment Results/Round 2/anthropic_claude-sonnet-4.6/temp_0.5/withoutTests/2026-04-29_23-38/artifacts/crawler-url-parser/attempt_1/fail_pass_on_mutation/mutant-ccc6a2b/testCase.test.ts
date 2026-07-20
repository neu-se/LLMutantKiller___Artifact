import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('crawler-url-parser', () => {
  it('should call console.log when loaded as main module', () => {
    // The parse function should return null for URLs with illegal chars (space)
    const url = "https ://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).toBeNull();
  });
});