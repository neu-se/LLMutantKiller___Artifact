import { plural } from '../index';

describe('plural', () => {
  it('should not throw an error when trying to monkey patch String.prototype.plural', () => {
    // Arrange
    delete String.prototype.plural;

    // Act
    plural.monkeyPatch();

    // Assert
    expect(String.prototype.plural).toBeDefined();
  });

  it('should throw an error when trying to monkey patch String.prototype.plural if it is already defined', () => {
    // Arrange
    String.prototype.plural = () => {};

    // Act and Assert
    expect(() => plural.monkeyPatch()).toThrowError();
  });
});