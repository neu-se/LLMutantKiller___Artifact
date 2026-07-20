// test/removeDirectoryIndex.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeDirectoryIndex option behavior', () => {
    it('should normalize URLs by removing directory index files when option is enabled', () => {
        const result = parse("http://example.com/path/index.htm");
        expect(result?.path).toBe("/path/");
    });
});