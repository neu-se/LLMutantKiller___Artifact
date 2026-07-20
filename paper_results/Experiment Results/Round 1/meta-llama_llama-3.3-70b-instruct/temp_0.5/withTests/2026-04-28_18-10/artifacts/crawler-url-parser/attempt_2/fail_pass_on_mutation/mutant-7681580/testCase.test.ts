import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function test', function () {
    it.skip('should pass for ""', function () {
        let url = "";
        let result = parse(url);
        expect(result).toBeNull();
    });

    it('should pass for "   "', function () {
        let url = "   ";
        let result = parse(url);
        expect(result).toBeNull();
    });

    it.skip('should pass for null', function () {
        let url = null;
        let result = parse(url);
        expect(result).toBeNull();
    });

    it('should pass for undefined', function () {
        let url = undefined;
        let result = parse(url);
        expect(result).toBeNull();
    });
});