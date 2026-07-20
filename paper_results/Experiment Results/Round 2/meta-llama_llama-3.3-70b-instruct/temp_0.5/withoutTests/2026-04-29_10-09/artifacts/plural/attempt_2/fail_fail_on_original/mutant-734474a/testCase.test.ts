import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should throw an error when adding an empty string rule', () => {
    expect(() => plural.addRule("", 'bacteria')).toThrow();
  });
});