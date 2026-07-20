import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should not throw an error when module.parent is false', () => {
    // Arrange
    const originalModuleParent = module.parent;
    module.parent = false;
    const currentUrlStr = 'https://www.example.com';
    const baseUrlStr = undefined;

    // Act and Assert
    expect(() => parse(currentUrlStr, baseUrlStr)).not.toThrow();
    module.parent = originalModuleParent;
  });
});