import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should not be null when called directly', () => {
    const url = "https ://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(parse).not.toThrow();
    expect(result).not.toBeNull();
    expect(Object.keys(result)).toHaveLength(10);
  });
});