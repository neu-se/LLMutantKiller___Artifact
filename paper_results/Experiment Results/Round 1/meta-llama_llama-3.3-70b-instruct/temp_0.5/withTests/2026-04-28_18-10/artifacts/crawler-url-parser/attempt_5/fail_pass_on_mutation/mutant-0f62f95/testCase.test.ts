import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should not be null when currentUrlStr is valid', () => {
    // Arrange
    const currentUrlStr = 'https://www.example.com';
    const baseUrlStr = undefined;

    // Act
    const result = parse(currentUrlStr, baseUrlStr);

    // Assert
    expect(result).not.toBeNull();
  });
});