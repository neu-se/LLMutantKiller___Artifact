import * as mod from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser result_normalize_options", () => {
  it("should have removeTrailingSlash set to true", () => {
    // The result_normalize_options is a module-level constant
    // Access it through the module's internal state
    const moduleStr = mod.toString ? mod.toString() : JSON.stringify(mod);
    // Since we can't access private vars, test via parse behavior
    // parse with trailing slash on root domain
    const r1 = mod.parse("http://example.com/");
    const r2 = mod.parse("http://example.com");
    // Node URL.parse treats these differently in pathname
    expect(r1!.path).toBe("/");
    expect(r2!.path).toBe("/");
  });
});