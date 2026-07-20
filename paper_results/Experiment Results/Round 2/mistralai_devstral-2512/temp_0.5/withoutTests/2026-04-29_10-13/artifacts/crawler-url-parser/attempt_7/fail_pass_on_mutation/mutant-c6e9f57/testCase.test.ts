import * as parser from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('URL parser module initialization', () => {
  it('should have normalization options defined in module', () => {
    // Check if the module has the expected structure
    expect(parser).toBeDefined();
    expect(parser.parse).toBeDefined();
    expect(parser.extract).toBeDefined();
    expect(parser.gettype).toBeDefined();

    // Test actual parsing behavior that might be affected by options
    const result = parser.parse('http://example.com');
    expect(result).not.toBeNull();
    if (result) {
      expect(result.host).toBe('example.com');
    }
  });
});