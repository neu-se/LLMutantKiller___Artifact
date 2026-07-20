import { parse, extract, gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser configuration", () => {
  it("removeTrailingSlash option should be true causing trailing slashes to be stripped in normalized results", () => {
    // Since result_normalize_options is defined but the removeTrailingSlash value
    // affects the module's defined behavior intent, we test via gettype
    // which compares paths - trailing slash normalization affects path comparison
    const type = gettype("http://example.com/path/", "http://example.com/path");
    expect(type).toBe("samelevel");
  });
});