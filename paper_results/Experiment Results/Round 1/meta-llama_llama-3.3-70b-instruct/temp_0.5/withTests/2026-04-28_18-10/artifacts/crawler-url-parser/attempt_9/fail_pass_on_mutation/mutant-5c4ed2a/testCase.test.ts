import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should pass when run against the original code and fail when run against the mutated code', () => {
        const url = "http://example.com#abc#def#ghi#jkl#mno#pqr#stu#vwx#yza#bcd#efg#hij#klm#nop#qrs#tuv#wxy#zab#123#456#789#abc#def";
        const result = parse(url);
        expect(result.url).toBe("http://example.com/");
    });
});