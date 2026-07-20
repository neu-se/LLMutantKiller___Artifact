import plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");

describe("plural function", () => {
  it("should handle words ending with 'ICS' in uppercase", () => {
    expect(plural("PHYSICS", 2)).toBe("PHYSICS");
    expect(plural("ECONOMICS", 2)).toBe("ECONOMICS");
    expect(plural("MATHEMATICS", 2)).toBe("MATHEMATICS");
  });
});