import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural behavior with empty string in misc array", () => {
  it("should handle words matching empty string pattern correctly", () => {
    // The mutation adds an empty string to the misc array which creates a regex pattern that matches empty strings
    // This test checks that the plural of "es" (which would match the empty string pattern + "s") is handled correctly
    expect(plural("es")).toBe("eses");
  });
});