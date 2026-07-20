import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should pass when the input URL does not have a protocol and the condition is met', () => {
        const url = "www.google.com";
        const result = parse(url);
        expect(result.url).toBe("http://www.google.com/");
    });

    it('should fail when the input URL does not have a protocol and the condition is not met', () => {
        const url = "www:google.com";
        const result = parse(url);
        expect(result).toBeNull();
    });
});