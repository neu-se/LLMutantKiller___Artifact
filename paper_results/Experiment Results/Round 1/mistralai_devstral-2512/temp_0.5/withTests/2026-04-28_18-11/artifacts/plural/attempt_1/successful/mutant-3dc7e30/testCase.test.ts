import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with bacterium", () => {
  it("should return 'bacteria' for 'bacterium'", () => {
    expect(plural('bacterium')).toBe('bacteria');
  });
});