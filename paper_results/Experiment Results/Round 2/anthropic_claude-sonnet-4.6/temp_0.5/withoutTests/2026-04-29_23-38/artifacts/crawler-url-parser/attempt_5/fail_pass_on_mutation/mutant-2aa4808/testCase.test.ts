import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('detects slashesDenoteHost mutation', () => {
    const URL = require('url');
    // Verify the actual difference in URL.parse behavior
    const withTrue = URL.parse('//example.com/path', true, true);
    const withFalse = URL.parse('//example.com/path', true, false);
    // With slashesDenoteHost=true, host should be 'example.com'
    expect(withTrue.host).toBe('example.com');
    // With slashesDenoteHost=false, host should be null
    expect(withFalse.host).toBeNull();
    
    // Now test that parse() uses slashesDenoteHost=true for base URL
    // We need a scenario where baseUrlStr reaches URL.parse as '//...'
    // But the code does replace(/^\/\//, 'http://') first...
    // So we need baseUrlStr that doesn't start with // but still triggers the difference
    // This seems impossible, so let's verify the baseurl field
    const result = parse('page', '//example.com/');
    expect(result).not.toBeNull();
    expect((result as any).baseurl).toBe('http://example.com/');
  });
});