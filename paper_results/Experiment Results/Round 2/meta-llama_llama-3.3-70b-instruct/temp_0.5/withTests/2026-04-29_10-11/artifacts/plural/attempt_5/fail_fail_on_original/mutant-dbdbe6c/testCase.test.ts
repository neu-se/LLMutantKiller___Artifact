import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should not throw an error when trying to monkey patch String.prototype.plural', () => {
    // Arrange
    delete String.prototype.plural;

    // Act and Assert
    expect(() => plural.monkeyPatch()).not.toThrowError();
  });
});