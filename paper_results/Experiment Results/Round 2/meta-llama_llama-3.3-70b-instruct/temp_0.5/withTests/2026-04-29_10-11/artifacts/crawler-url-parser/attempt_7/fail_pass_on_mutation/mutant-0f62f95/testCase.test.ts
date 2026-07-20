import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should not throw an error when called', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager";
    expect(() => parse(url)).not.toThrow();
  });
});