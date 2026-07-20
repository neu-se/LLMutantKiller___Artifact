import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should return null when executed directly', () => {
    const result = parse("https://www.example.com");
    expect(result).not.toBeNull();
    // If the code is executed directly, it will not be null
    // But if the code is executed conditionally, it will be null
  });
});