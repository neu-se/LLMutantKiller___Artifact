import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"
import * as cheerio from 'cheerio'

describe('extract', () => {
  it('should handle href with embedded newline in fragment', () => {
    const $ = cheerio.load('<a href="http://example.com/page#section\nmore">link</a>');
    const result = extract($, 'http://example.com/');
    expect(result).toEqual([]);
  });
});