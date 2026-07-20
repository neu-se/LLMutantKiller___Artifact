import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should not override existing String.prototype.plural', () => {
    // Arrange
    String.prototype.plural = () => 'existing implementation';

    // Act
    try {
      plural.monkeyPatch();
    } catch (e) {
      // Assert
      expect(e.message).toBe('Unable to add plural function to String object');
    }

    // Assert that String.prototype.plural is still the existing implementation
    expect(String.prototype.plural()).toBe('existing implementation');
  });
});