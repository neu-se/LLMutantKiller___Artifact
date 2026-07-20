// test/parse-url-with-base.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with base URL containing auth', () => {
    it('should correctly handle base URLs with authentication when resolving relative paths', () => {
        const result = parse("relative/path", "http://user:pass@example.com/base");
        expect(result).not.toBeNull();
        expect(result!.url).toBe("http://user:pass@example.com/relative/path");
        expect(result!.host).toBe("user:pass@example.com");
        expect(result!.path).toBe("/relative/path");
    });
});