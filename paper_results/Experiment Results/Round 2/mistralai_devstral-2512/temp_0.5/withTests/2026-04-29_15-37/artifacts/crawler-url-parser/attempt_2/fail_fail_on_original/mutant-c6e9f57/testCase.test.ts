// testCase.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with URL normalization options', () => {
    it('should normalize URLs by removing query parameters like utm_source', () => {
        const result = parse("http://www.example.com/path?utm_source=test&param=value");
        expect(result.url).toBe("http://www.example.com/path?param=value");
    });
});