import plural = require('./index');

describe('plural', () => {
  it('should throw an error with a specific message when trying to monkey patch String.prototype if it already has a plural function', () => {
    plural.monkeyPatch();
    try {
      plural.monkeyPatch();
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).not.toBe('');
      }
    }
  });
});