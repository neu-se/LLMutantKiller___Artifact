import { extract } from "../crawler-url-parser.js";
import cheerio from 'cheerio';

describe('crawler-url-parser', () => {
    it('should handle null currentUrl correctly', () => {
        const data = '<a href="https://www.example.com">Example</a>';
        const sourceUrl = 'https://www.example.com';
        const $ = cheerio.load(data);
        const href = $('a').attr('href');
        const currentUrl = null;
        const baseUrlStr = sourceUrl;
        const urlMap = new Map();
        if (currentUrl || currentUrl.url) {
            expect(() => {
                if (urlMap.has(currentUrl.url)) {
                    let tmpUrl = urlMap.get(currentUrl.url);
                    if (!tmpUrl.text.includes('Example')) {
                        tmpUrl.text = `${tmpUrl.text} Example`;
                    }
                } else {
                    currentUrl.text = 'Example';
                    currentUrl.baseurl = baseUrlStr;
                    urlMap.set(currentUrl.url, currentUrl);
                }
            }).toThrowError();
        }
    });
});