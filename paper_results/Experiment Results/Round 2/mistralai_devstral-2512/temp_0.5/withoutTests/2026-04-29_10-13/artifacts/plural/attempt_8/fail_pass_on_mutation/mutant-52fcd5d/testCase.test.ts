import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle words ending with 'jitter'", () => {
    expect(plural("jitter")).toBe("jitters");
  });
});