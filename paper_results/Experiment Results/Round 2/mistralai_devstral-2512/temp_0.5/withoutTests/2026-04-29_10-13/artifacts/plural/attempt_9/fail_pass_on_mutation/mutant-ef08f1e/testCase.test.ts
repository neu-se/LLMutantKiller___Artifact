import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 'eo' by adding 's' and not affect words with 'eo' in the middle", () => {
    expect(plural("stereo", 2)).toBe("stereos");
    expect(plural("people", 2)).toBe("peoples");
  });
});