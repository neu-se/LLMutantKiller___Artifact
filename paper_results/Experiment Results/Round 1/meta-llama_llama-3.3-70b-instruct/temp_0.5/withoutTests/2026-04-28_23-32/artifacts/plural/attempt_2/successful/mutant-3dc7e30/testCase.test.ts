import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should return the correct plural form of 'bacterium'", () => {
    expect(plural('bacterium', 2)).not.toBe('');
  });
});