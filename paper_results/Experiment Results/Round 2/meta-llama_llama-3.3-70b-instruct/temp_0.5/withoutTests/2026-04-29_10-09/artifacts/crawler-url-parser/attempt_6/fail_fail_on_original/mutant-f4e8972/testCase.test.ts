import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
import { cheerio } from 'cheerio';

describe('crawler-url-parser', () => {
  it('should correctly parse HTML data and extract URLs', () => {
    const data = '<html><body><a href="https://www.example.com">Example</a></body></html>';
    const sourceUrl = 'https://www.example.com';
    const $ = cheerio.load(data);
    const result = extract($, sourceUrl);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].url).toBe('https://www.example.com');
  });
});