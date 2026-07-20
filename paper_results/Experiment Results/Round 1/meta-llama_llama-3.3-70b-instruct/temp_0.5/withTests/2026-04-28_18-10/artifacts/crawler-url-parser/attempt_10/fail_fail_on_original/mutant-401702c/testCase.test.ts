import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle URLs without a protocol and with a character that is matched by \w but not by \W', () => {
        const url = '_example.com';
        const resultOriginal = parse(url);
        expect(resultOriginal.url).toBe('http://_example.com/');
        const resultMutated = parse(url); // run this test case on the mutated code
        expect(resultMutated).toBeNull(); // this should fail
    });
});