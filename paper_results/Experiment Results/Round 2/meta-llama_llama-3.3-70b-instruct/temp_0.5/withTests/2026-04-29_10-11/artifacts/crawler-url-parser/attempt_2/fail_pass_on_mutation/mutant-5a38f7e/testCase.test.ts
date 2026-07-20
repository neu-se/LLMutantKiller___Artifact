import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "samelevel" for same path without last part', () => {
        let linkurl = { path: '/path/to/resource' };
        let pageurl = { path: '/path/to/another' };
        expect(gettype(linkurl, pageurl)).toBe('samelevel');
    });

    it('should return "sublevel" for path with one more part', () => {
        let linkurl = { path: '/path/to/resource' };
        let pageurl = { path: '/path/to' };
        expect(gettype(linkurl, pageurl)).toBe('sublevel');
    });

    it.skip('should return "uplevel" for path with one less part', () => {
        let linkurl = { path: '/path' };
        let pageurl = { path: '/path/to/resource' };
        expect(gettype(linkurl, pageurl)).toBe('uplevel');
    });
});