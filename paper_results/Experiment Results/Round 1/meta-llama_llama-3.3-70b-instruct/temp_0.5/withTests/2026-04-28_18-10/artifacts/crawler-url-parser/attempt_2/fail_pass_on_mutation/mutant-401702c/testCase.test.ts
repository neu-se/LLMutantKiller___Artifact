import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URLs without a protocol', () => {
        const url = '_example.com';
        const resultOriginal = parse(url);
        expect(resultOriginal.url).toBe('http://_example.com/');
    });
});