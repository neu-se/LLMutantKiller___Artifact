import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should not throw an error when trying to monkey patch String.prototype.plural and then unmonkey patch', () => {
    // Arrange
    delete String.prototype.plural;

    // Act
    plural.monkeyPatch();
    plural.unmonkeyPatch();

    // Assert
    expect(String.prototype.plural).toBeUndefined();
  });
});