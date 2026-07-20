import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural rule for words containing x', () => {
  it('should pluralize "taxi" as "taxis" not "taxies" since x is not at the end', () => {
    expect(plural('taxi')).toBe('taxis');
  });
});