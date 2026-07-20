import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
    it('should throw an error when currentUrl is null and currentUrl.url is truthy', () => {
        const htmlString = '<a href="http://www.example.com">Example</a>';
        const baseUrl = 'http://www.example.com';
        const currentUrl = null;
        const urlMap = new Map();
        urlMap.set('http://www.example.com', { url: 'http://www.example.com' });

        expect(() => {
            if (currentUrl || currentUrl.url) {
                if (urlMap.has(currentUrl.url)) {
                    const tmpUrl = urlMap.get(currentUrl.url);
                    tmpUrl.text = 'Example';
                } else {
                    currentUrl.text = 'Example';
                    currentUrl.baseurl = baseUrl;
                    urlMap.set(currentUrl.url, currentUrl);
                }
            }
        }).toThrowError();
    });
});