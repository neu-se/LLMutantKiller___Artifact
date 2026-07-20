import plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");

describe("plural function", () => {
  it("should handle words ending with 'ics' case-insensitively including mixed case", () => {
    expect(plural("PhYsIcS", 2)).toBe("PhYsIcS");
    expect(plural("eCoNoMiCs", 2)).toBe("eCoNoMiCs");
    expect(plural("mAtHeMaTiCs", 2)).toBe("mAtHeMaTiCs");
  });
});