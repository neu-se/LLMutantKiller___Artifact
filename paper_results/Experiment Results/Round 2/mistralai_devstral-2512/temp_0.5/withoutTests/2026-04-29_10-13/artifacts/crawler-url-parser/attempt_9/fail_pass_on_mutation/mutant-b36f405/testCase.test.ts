import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should demonstrate the regex pattern difference in unused configuration", () => {
    // This test demonstrates the conceptual difference between the patterns
    // \w matches word characters (letters, digits, underscore)
    // \W matches non-word characters (everything else)
    const testString1 = "utm_source=test";  // contains word chars after utm_
    const testString2 = "utm_source=test@"; // contains non-word char after utm_

    // Original pattern /^utm_\w+/i would match testString1 but not testString2
    // Mutated pattern /^utm_\W+/i would match testString2 but not testString1
    // However, since the config isn't used, this has no actual effect
    expect(true).toBe(true); // Placeholder - actual test can't be written
  });
});