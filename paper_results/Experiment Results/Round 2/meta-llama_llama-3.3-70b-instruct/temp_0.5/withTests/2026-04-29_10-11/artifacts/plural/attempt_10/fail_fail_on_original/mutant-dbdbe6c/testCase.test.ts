import plural = require('./index');

describe('plural', () => {
  it('should throw an error when trying to monkey patch String.prototype.plural if the condition is false', () => {
    // Arrange
    String.prototype.plural = () => {};

    // Act and Assert
    expect(() => plural.monkeyPatch()).toThrowError();
  });

  it('should not throw an error when trying to monkey patch String.prototype.plural if the condition is true', () => {
    // Arrange
    delete String.prototype.plural;

    // Act
    plural.monkeyPatch();

    // Assert
    expect(String.prototype.plural).toBeDefined();
  });
});