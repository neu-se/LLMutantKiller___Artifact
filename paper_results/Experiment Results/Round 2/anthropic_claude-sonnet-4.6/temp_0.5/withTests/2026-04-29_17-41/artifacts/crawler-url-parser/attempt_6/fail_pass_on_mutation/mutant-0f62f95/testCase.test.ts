describe('parse function correctness', () => {
  it('should correctly parse a simple http URL returning expected fields', () => {
    const cup = require('../../../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    const result = cup.parse('http://www.google.com/path?q=test');
    
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://www.google.com/path?q=test');
    expect(result.protocol).toBe('http:');
    expect(result.host).toBe('www.google.com');
    expect(result.domain).toBe('google.com');
    expect(result.subdomain).toBe('www');
    expect(result.path).toBe('/path');
    expect(result.search).toBe('?q=test');
    expect(result.querycount).toBe(1);
  });
});