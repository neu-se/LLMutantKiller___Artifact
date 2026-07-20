import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with fragment in unusual position', () => {
  it('should correctly handle URL where fragment appears after protocol but before host', () => {
    const result = parse("http://user#pass@example.com/path");
    // Original: strips fragment -> "http://user" -> host="user", url="http://user/"
    // Mutation: /#.$/ doesn't match (long fragment) -> fragment stays
    // url.parse("http://user#pass@example.com/path") -> host=null, hash="#pass@example.com/path"
    // delete hash -> host=null -> ret.url="http:" (different!)
    expect(result).not.toBeNull();
    expect(result!.host).toBe("user");
  });
});