import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with 'roof' input", () => {
  it("should correctly pluralize 'roof' to 'roofs'", () => {
    expect(plural('roof')).toBe('roofs');
  });
});