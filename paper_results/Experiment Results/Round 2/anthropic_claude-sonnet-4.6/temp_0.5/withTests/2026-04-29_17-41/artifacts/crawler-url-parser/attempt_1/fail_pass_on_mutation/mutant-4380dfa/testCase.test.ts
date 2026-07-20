import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse protocol-relative URL without base URL', () => {
  it('should parse "//www.stackoverflow.com/questions.exe" as http URL', () => {
    const res = parse("//www.stackoverflow.com/questions.exe");
    expect(res).not.toBeNull();
    expect(res.url).toBe("http://www.stackoverflow.com/questions.exe");
    expect(res.protocol).toBe("http:");
    expect(res.host).toBe("www.stackoverflow.com");
  });
});