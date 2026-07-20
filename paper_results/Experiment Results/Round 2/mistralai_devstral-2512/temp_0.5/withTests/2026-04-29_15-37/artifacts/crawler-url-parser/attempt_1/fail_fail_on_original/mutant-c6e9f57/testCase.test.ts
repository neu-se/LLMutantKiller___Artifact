// testCase.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with URL normalization options', () => {
    it('should normalize URLs by removing trailing slashes and directory indices', () => {
        const result = parse("http://www.example.com/path/index.html");
        expect(result.url).toBe("http://www.example.com/path/");
    });
});