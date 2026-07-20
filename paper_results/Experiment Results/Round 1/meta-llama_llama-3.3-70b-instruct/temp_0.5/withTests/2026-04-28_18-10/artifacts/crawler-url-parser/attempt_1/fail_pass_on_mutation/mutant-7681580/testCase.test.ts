import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function test', function () {
    it('should pass for "http://www.google.com"', function () {
        let url = "http://www.google.com";
        let result = parse(url);
        expect(result.url).toBe("http://www.google.com/");
    });

    it('should pass for "https://www.google.com"', function () {
        let url = "https://www.google.com";
        let result = parse(url);
        expect(result.url).toBe("https://www.google.com/");
    });

    it('should pass for "www.google.com"', function () {
        let url = "www.google.com";
        let result = parse(url);
        expect(result.url).toBe("http://www.google.com/");
    });

    it('should pass for "google.com"', function () {
        let url = "google.com";
        let result = parse(url);
        expect(result.url).toBe("http://google.com/");
    });

    it('should pass for "http://www.google.com/"', function () {
        let url = "http://www.google.com/";
        let result = parse(url);
        expect(result.url).toBe("http://www.google.com/");
    });

    it('should pass for "https://www.google.com/"', function () {
        let url = "https://www.google.com/";
        let result = parse(url);
        expect(result.url).toBe("https://www.google.com/");
    });

    it('should pass for "/path"', function () {
        let url = "/path";
        let result = parse(url);
        expect(result.url).toBe("/path");
    });

    it.skip('should pass for "./path"', function () {
        let url = "./path";
        let result = parse(url);
        expect(result.url).toBe("http://./path");
    });

    it.skip('should pass for "../path"', function () {
        let url = "../path";
        let result = parse(url);
        expect(result.url).toBe("http://../path");
    });

    it.skip('should pass for "path?query"', function () {
        let url = "path?query";
        let result = parse(url);
        expect(result.url).toBe("http://path?query");
    });

    it.skip('should pass for "path#fragment"', function () {
        let url = "path#fragment";
        let result = parse(url);
        expect(result.url).toBe("http://path");
    });

    it('should pass for "http://www.google.com/path?query#fragment"', function () {
        let url = "http://www.google.com/path?query#fragment";
        let result = parse(url);
        expect(result.url).toBe("http://www.google.com/path?query");
    });
});