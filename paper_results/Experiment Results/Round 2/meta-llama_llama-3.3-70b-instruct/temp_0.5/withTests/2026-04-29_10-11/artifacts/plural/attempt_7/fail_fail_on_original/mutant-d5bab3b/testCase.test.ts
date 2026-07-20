const plural = require('../../../../index.js');

describe('plural', function() {
  it('should correctly pluralize "woman" regardless of case', function() {
    expect(plural('woman')).toBe('women');
    expect(plural('Woman')).toBe('women');
    expect(plural('WOMAN')).toBe('women');
  });
});