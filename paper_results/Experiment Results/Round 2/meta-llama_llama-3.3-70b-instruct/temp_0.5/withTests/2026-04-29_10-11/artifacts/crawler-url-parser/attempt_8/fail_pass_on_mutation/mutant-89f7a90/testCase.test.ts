import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should return null when baseUrl has an unexpected string after removing the fragment', () => {
        const currentUrl = "http://example.com";
        const baseUrl = "http://example.com#Stryker was here!";
        const result = parse(currentUrl, baseUrl);
        expect(result).toBeNull();
    });
});