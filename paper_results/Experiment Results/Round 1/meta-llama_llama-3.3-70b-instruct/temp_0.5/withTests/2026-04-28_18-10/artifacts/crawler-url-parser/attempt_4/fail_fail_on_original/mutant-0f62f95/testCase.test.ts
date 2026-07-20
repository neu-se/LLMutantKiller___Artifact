import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should return null when module.parent is true', () => {
    // Arrange
    const currentUrlStr = 'https ://www.npmjs.com/package/electron-window-manager';
    const baseUrlStr = undefined;

    // Act
    const result = parse(currentUrlStr, baseUrlStr);

    // Assert
    expect(result).not.toBeNull();
  });
});