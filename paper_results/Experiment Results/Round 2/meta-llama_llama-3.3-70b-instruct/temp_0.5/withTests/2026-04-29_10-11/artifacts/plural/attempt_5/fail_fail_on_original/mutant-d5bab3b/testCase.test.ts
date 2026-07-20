import { plural } from './index';

describe('plural', function() {
  it('should correctly pluralize "woman" regardless of case', function() {
    expect(plural('woman')).toBe('women');
    expect(plural('WoMan')).toBe('women');
  });
});