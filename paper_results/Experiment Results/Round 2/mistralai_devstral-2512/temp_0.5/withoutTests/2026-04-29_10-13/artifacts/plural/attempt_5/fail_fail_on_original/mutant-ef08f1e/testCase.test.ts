import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 'eo' but not match words containing 'eo'", () => {
    expect(plural("stereo", 2)).toBe("stereos");
    expect(plural("people", 2)).toBe("people");
  });
});