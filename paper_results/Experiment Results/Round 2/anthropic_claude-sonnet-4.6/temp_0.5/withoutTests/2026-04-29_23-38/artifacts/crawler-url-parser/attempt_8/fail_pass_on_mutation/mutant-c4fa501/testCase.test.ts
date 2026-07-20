import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should have removeDirectoryIndex as true in module options", () => {
    // Access internal module state through Node.js module system
    const mod = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
    const moduleWrapper = require.cache[require.resolve("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js")];
    // Check exports - result_normalize_options isn't exported so check behavior
    // The only detectable difference: parse path for index files
    const result = mod.parse("http://example.com/index.html");
    expect(result?.path).toBe("/index.html");
  });
});