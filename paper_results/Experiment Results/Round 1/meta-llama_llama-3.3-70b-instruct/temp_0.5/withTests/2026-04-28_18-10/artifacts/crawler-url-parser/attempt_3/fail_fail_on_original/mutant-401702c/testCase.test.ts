import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URLs without a protocol and with non-word characters', () => {
        const url = '!example.com';
        const result = parse(url);
        expect(result).toBeNull();
    });
});