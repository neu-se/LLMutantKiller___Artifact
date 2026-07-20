// test/parse-url-with-auth.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with authentication', () => {
    it('should correctly parse URL with username and password', () => {
        const result = parse("http://user:pass@example.com/path");
        expect(result).not.toBeNull();
        expect(result!.url).toBe("http://user:pass@example.com/path");
        expect(result!.host).toBe("user:pass@example.com");
        expect(result!.protocol).toBe("http:");
        expect(result!.path).toBe("/path");
    });
});