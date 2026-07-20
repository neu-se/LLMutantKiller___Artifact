import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural y-ending words', () => {
  it('should pluralize byway as byways not bywaies', () => {
    expect(plural('byway')).toBe('byways');
  });
});