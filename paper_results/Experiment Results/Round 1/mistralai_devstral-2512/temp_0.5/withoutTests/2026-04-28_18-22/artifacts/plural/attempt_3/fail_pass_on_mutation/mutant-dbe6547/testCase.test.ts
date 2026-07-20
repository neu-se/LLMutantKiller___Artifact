import plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");

describe("plural function", () => {
  it("should handle words ending with 'ICS' (uppercase) correctly", () => {
    expect(plural("PHYSICS", 2)).toBe("PHYSICS");
  });
});