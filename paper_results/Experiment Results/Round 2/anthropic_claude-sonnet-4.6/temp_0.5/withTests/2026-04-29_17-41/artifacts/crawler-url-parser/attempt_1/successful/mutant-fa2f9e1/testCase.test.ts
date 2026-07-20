import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function text property', () => {
  it('should set text to the anchor text when anchor has non-empty text', () => {
    const html = '<html><body><a href="http://www.example.com/page">Click Here</a></body></html>';
    const result = extract(html, 'http://www.example.com/');
    
    expect(result.length).toBe(1);
    expect(result[0].text).toBe('Click Here');
  });
});