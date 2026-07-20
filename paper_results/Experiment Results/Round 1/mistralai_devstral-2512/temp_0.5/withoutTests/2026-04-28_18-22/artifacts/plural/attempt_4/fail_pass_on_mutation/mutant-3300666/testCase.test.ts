import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize "bison" as "bison"', () => {
    expect(plural('bison')).toBe('bison');
  });
});