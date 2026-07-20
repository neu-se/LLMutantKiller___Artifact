import plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");

describe("plural function", () => {
  it("should handle words ending with 'ics' case-insensitively", () => {
    expect(plural("Physics", 2)).toBe("Physics");
    expect(plural("ECONOMICS", 2)).toBe("ECONOMICS");
    expect(plural("Mathematics", 2)).toBe("Mathematics");
  });
});