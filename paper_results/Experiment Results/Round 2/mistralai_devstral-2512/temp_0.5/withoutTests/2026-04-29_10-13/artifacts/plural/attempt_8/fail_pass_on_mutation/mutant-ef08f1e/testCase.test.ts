import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle words ending with 'eo' but not match partial matches", () => {
    expect(plural("stereo", 2)).toBe("stereos");
    expect(plural("radio", 2)).toBe("radios");
  });
});