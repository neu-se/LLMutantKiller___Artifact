import plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");

describe("plural function", () => {
  it("should handle mixed case words ending with 'ics'", () => {
    expect(plural("PhYsIcS", 2)).toBe("PhYsIcS");
  });
});