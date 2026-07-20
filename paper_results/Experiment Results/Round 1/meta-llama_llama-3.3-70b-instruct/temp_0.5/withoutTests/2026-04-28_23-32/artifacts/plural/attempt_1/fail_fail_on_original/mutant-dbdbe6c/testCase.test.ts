import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should not override existing String.prototype.plural', () => {
    // Arrange
    String.prototype.plural = () => 'existing implementation';

    // Act
    plural.monkeyPatch();

    // Assert
    expect(String.prototype.plural).toBe('existing implementation');
  });
});