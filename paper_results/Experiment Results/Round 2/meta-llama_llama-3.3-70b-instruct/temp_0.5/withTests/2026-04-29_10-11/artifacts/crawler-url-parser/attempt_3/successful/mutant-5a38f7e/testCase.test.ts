import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return correct type for linkurl with empty path', () => {
        let linkurl = { host: 'example.com', path: '' };
        let pageurl = { host: 'example.com', path: '/path' };
        expect(gettype(linkurl, pageurl)).not.toBe('internal');
    });
});