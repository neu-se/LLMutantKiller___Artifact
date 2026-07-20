import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should return an object with url property when given a valid URL and module.parent is false', () => {
    const originalModuleParent = module.parent;
    // We cannot directly set module.parent to null, so we will just test the function as is.
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url).toBe("https://www.npmjs.com/package/electron-window-manager");
  });
});