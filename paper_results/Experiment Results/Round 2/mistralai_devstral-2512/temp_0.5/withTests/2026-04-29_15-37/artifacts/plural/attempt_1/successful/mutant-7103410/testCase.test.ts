import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('monkeyPatch functionality', () => {
  it('should correctly pluralize words when called on String prototype', () => {
    plural.monkeyPatch();
    const result = "test".plural();
    expect(result).toBe("tests");
  });
});