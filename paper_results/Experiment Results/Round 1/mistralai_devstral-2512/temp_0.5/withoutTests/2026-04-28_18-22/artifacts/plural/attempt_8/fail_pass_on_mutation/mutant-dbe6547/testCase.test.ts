import plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");

describe("plural function", () => {
  it("should handle words ending with 'ICS' in lowercase when input is uppercase", () => {
    expect(plural("BASICS", 2)).toBe("BASICS");
  });
});