import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle URLs without a protocol and with a non-word character at the start', () => {
        const url = '#example.com';
        const resultOriginal = parse(url);
        expect(resultOriginal).toBeNull();
    });
});