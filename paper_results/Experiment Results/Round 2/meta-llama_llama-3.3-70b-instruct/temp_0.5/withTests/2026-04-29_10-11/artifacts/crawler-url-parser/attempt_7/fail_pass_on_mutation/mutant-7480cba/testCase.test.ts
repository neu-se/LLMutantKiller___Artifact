import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle URLs starting with "x:"', () => {
        const url = 'x:example.com';
        const result = parse(url);
        expect(result).toBeNull();
    });
});