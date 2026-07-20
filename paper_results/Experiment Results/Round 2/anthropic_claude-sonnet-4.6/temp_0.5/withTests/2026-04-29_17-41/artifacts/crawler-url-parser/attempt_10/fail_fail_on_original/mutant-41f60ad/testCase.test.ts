import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with encoded ampersand in query value', () => {
  it('should decode encoded ampersand and split into separate query params', () => {
    const result = parse("http://www.example.com/path?a=1%26b=2");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/path?a=1&b=2");
  });
});