import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function with mutated code', () => {
  it('should throw an error when module.parent is true', () => {
    // Arrange
    const htmlString = '<html><body><a href="https://www.example.com">Example</a></body></html>';
    const baseUrl = 'https://www.example.com';

    // Act and Assert
    expect(() => extract(htmlString, baseUrl)).toThrowError();
  });
});