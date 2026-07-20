import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should return the correct url when removeTrailingSlash is true', () => {
        const result_normalize_options = {
            removeDirectoryIndex: false,
            removeTrailingSlash: true,
            stripWWW: true,
            stripFragment: true,
            normalizeHttps: false,
            normalizeProtocol: true,
            removeQueryParameters: [/^utm_\w+/i, 'ref']
        }
        const url = "http://www.example.com/path/";
        const expectedUrl = "http://www.example.com/path";
        const result = parse(url);
        expect(result.url).toBe(expectedUrl);
    });
});