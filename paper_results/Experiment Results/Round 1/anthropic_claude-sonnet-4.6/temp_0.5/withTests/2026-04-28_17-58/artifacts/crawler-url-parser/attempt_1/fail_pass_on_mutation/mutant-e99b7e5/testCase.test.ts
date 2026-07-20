import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function text handling', () => {
  it('should set text to empty string when anchor has no text content', () => {
    const html = '<html><body><a href="http://www.example.com/page">Link Text</a></body></html>';
    const result = extract(html, 'http://www.example.com/');
    const link = result.find((el: any) => el.url === 'http://www.example.com/page');
    expect(link).toBeDefined();
    expect(link.text).toBe('Link Text');
  });
});