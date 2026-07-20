import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should not throw an error when trying to monkey patch String.prototype.plural if it is not already defined', () => {
    // Arrange
    delete String.prototype.plural;

    // Act
    plural.monkeyPatch();

    // Assert
    expect(String.prototype.plural).toBeDefined();
  });
});