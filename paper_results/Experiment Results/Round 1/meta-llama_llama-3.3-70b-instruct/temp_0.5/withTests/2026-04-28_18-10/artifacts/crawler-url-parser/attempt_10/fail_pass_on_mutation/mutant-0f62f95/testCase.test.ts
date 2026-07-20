import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should return a valid result when given a valid URL', () => {
    // Arrange
    const currentUrlStr = 'https://www.example.com';
    const baseUrlStr = undefined;

    // Act
    const result = parse(currentUrlStr, baseUrlStr);

    // Assert
    expect(result).toHaveProperty('url', 'https://www.example.com/');
  });
});