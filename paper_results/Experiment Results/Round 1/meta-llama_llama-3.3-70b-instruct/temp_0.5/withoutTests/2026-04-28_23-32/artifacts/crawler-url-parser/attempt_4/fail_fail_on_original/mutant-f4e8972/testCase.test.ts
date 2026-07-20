import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
import * as cheerio from 'cheerio';

describe('crawler-url-parser', () => {
  it('should correctly parse HTML data', () => {
    const $ = cheerio.load('<html><body><a href="https://www.example.com">Example</a></body></html>');
    const result = extract($, 'https://www.example.com');
    expect(result).not.toHaveLength(0);
    if (result.length > 0) {
      expect(result[0].url).toBe('https://www.example.com');
      expect(result[0].text).toBe('Example');
    }
  });
});