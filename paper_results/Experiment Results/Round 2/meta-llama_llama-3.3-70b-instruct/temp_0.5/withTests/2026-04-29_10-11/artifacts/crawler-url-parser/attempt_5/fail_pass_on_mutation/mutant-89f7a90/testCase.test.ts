import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should return null when baseUrl has a fragment that is not removed', () => {
        const currentUrl = "http://example.com";
        const baseUrl = "http://example.com#Stryker was here!";
        const result = parse(currentUrl, baseUrl);
        expect(result).toBeNull();
    });
});