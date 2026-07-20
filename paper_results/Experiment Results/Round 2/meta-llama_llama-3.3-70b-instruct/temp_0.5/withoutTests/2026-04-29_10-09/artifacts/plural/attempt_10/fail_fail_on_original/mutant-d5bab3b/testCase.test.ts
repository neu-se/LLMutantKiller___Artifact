const index = require('./index.js');
const plural = index.plural;

describe('plural', () => {
  it('should correctly pluralize "man"', () => {
    expect(plural('man')).toBe('men');
    expect(plural('Man')).toBe('Men');
    expect(plural('woman')).toBe('women');
    expect(plural('woman')).not.toBe('womans'); 
    expect(plural('man')).not.toBe('mans'); 
  });
});