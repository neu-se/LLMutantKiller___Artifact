import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse plain domain URL without base URL', () => {
  it('should prepend http:// exactly once to a plain domain URL', () => {
    const res = parse("aaa/bbb");
    expect(res).not.toBeNull();
    expect((res as any).url).toBe("http://aaa/bbb");
  });
});