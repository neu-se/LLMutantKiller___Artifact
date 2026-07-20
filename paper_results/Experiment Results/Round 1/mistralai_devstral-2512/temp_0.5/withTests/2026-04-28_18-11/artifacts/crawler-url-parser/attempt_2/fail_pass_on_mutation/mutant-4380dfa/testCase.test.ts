import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse protocol-less URLs', () => {
    it('should add http:// protocol to protocol-less URLs starting with //', () => {
        const result = parse("//example.com/path");
        expect(result?.url).toBe("http://example.com/path");
    });
});