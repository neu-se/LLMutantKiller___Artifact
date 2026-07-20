import * as path from "path";

describe("crawler-url-parser result_normalize_options", () => {
  it("should export or define result_normalize_options with stripFragment as true", () => {
    // Use require to load the module fresh and check all exported/accessible properties
    const modulePath = path.resolve(
      __dirname,
      "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"
    );
    
    // Clear cache to get fresh module
    delete require.cache[require.resolve(modulePath)];
    const mod = require(modulePath);
    
    // Check if normalize_options is somehow accessible
    // Try to find it through any means
    const keys = Object.keys(mod);
    console.log("Module keys:", keys);
    console.log("Module:", mod);
    
    // The stripFragment option should be true in original
    // This will fail if the module exposes it as false
    expect(mod.result_normalize_options?.stripFragment).toBe(true);
  });
});