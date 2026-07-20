import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should handle URLs with spaces in protocol when module is loaded directly", () => {
    // This test specifically targets the debug code that was removed in the mutation
    const originalModuleParent = module.parent;
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js")];
    module.parent = null;

    try {
      const { parse } = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
      const url = "https ://www.npmjs.com/package/electron-window-manager";
      const result = parse(url);
      expect(result).not.toBeNull();
      expect(result?.url).toBe("http://www.npmjs.com/package/electron-window-manager");
    } finally {
      module.parent = originalModuleParent;
    }
  });
});