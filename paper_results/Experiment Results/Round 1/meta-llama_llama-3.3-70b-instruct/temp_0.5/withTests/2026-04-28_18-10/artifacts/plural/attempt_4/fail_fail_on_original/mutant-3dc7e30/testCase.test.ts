import plural = require('../index.js');

describe('plural', function() {
  it('should correctly pluralize "bacterium"', function() {
    expect(plural('bacterium')).not.toBe('');
  });
});