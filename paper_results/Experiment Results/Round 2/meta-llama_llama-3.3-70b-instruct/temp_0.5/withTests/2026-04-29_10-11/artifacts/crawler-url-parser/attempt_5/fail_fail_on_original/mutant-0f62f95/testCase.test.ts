import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should return null when module.parent is true', () => {
    const originalModuleParent = module.parent;
    module.parent = {};
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).toBeNull();
    module.parent = originalModuleParent;
  });
});