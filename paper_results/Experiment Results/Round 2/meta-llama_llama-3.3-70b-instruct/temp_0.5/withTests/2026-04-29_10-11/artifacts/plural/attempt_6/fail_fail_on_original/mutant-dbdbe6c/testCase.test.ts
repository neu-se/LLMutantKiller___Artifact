import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should throw an error when trying to monkey patch String.prototype.plural if it is already defined', () => {
    // Arrange
    String.prototype.plural = () => { };

    // Act and Assert
    expect(() => plural.monkeyPatch()).toThrowError('Unable to add plural function to String object');
  });
});