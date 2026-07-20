import plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");

describe("plural function", () => {
  it("should handle words ending with 'ics' in mixed case with special characters", () => {
    expect(plural("PhYsIcS!", 2)).toBe("PhYsIcS!");
  });
});