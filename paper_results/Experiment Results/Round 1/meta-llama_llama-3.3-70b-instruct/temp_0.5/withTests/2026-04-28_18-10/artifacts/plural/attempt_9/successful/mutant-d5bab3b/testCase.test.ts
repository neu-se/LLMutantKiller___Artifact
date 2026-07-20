import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should correctly pluralize "woman" and "womans"', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('womans')).toBe('womanses');
  });
});