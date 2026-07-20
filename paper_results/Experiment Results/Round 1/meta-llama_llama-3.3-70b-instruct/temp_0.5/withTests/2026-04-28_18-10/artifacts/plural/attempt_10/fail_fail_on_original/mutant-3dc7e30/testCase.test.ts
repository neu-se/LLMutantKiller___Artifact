import plural from '../index';

describe('plural', function() {
  it('should correctly pluralize "bacterium"', function() {
    expect(plural('bacterium')).toBe('bacteria');
  });
});