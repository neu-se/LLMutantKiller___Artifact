const index = require('./index.js');
const plural = index;

describe('plural', () => {
  it('should correctly pluralize "woman"', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('man')).toBe('men');
    expect(plural('WoMan')).toBe('women'); 
  });
});