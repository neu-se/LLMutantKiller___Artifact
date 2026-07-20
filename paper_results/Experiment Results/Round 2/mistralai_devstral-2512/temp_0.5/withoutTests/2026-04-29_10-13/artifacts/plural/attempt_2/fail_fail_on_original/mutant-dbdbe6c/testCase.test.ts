import plural from './index.js';

describe('plural', () => {
  it('should handle String prototype extension correctly', () => {
    // Save original plural function
    const originalPlural = String.prototype.plural;

    // Manually add a dummy plural function to String prototype
    String.prototype.plural = function() { return 'dummy'; };

    // Import should not throw in original code but will throw in mutated code
    expect(() => {
      require('./index.js');
    }).not.toThrow();

    // Restore original
    String.prototype.plural = originalPlural;
  });
});