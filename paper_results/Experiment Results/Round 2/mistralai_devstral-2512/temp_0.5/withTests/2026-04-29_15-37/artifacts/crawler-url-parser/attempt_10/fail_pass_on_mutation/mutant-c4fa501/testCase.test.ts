// test/removeDirectoryIndex.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeDirectoryIndex option behavior', () => {
    it('should correctly parse subdomains when removeDirectoryIndex is enabled', () => {
        const result = parse("http://www.example.co.uk/path");
        expect(result?.subdomain).toBe("www");
        expect(result?.domain).toBe("example.co.uk");
    });
});