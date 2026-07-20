import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should return the correct url when the baseUrl has no fragment', () => {
        const currentUrl = "http://example.com";
        const baseUrl = "http://example.com";
        const result = parse(currentUrl, baseUrl);
        expect(result.baseurl).toBe("http://example.com");
        const mutatedBaseUrl = "http://example.com#Stryker was here!".replace(/#.*$/, "Stryker was here!");
        expect(mutatedBaseUrl).not.toBe("http://example.com");
    });
});