import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should return null when currentUrlStr is undefined', () => {
    // Arrange
    const currentUrlStr: any = undefined;
    const baseUrlStr = 'https://www.example.com';

    // Act
    const result = parse(currentUrlStr, baseUrlStr);

    // Assert
    expect(result).toBeNull();
  });
});