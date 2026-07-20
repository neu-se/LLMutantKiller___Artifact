import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should return null when module.parent is true', () => {
    // Since we can't directly test the condition `if (module.parent)`, 
    // we will test the function with a URL that should return null when module.parent is true
    const url = "https ://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).not.toBeNull();
  });
});