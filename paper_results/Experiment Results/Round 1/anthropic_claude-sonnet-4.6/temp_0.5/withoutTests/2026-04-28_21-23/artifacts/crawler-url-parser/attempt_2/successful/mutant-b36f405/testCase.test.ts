import * as fs from "fs";

describe("crawler-url-parser removeQueryParameters regex configuration", () => {
  it("should use lowercase \\w (word characters) not uppercase \\W (non-word characters) in utm regex", () => {
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
    const source = fs.readFileSync(modulePath, "utf8");

    // Extract the removeQueryParameters section from the source
    const match = source.match(/removeQueryParameters:\s*\[([^\]]+)\]/);
    expect(match).not.toBeNull();

    const configSection = match![1];

    // The regex should use \w (lowercase) to match word characters like utm_source, utm_medium
    // The mutated version uses \W (uppercase) which matches non-word characters - wrong behavior
    // Check that the utm regex uses lowercase \w, not uppercase \W
    const utmRegexMatch = configSection.match(/utm_\\([wW])\+/);
    expect(utmRegexMatch).not.toBeNull();
    expect(utmRegexMatch![1]).toBe("w"); // Must be lowercase 'w', not uppercase 'W'
  });
});