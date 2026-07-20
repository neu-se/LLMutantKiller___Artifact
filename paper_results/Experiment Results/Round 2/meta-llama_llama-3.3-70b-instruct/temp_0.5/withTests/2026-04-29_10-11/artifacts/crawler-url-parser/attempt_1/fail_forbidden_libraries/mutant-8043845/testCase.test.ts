import { extract } from "../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
import { JSDOM } from 'jsdom';

describe('extract function', () => {
    it('should return different results for original and mutated code', () => {
        const html = '<html><body><a href="javascript:void(0)">Test Link</a></body></html>';
        const dom = new JSDOM(html);
        const $ = require('cheerio').load(dom.window.document);

        // Original code
        const originalResult = extract($.html(), "http://www.example.com");
        expect(originalResult.length).toBe(0);

        // Mutated code
        const mutatedResult = extract($.html(), "http://www.example.com");
        expect(mutatedResult.length).toBe(1);
    });
});