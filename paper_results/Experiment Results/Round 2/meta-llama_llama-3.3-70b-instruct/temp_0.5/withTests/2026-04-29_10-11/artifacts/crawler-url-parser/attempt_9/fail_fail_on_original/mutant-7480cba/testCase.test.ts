import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle URLs starting with "a:"', () => {
        const url = 'a:example.com';
        const resultOriginal = parse(url);
        expect(resultOriginal).toBeNull();
        const resultMutated = parse(url); // assume this is run on the mutated code
        expect(resultMutated.url).toBe('http://a:example.com/'); // this should fail on the mutated code
    });
});