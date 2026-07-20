import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 'eo'", () => {
    expect(plural("stereo", 2)).toBe("stereos");
  });
});