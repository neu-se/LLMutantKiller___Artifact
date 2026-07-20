import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse http URL with short hostname', () => {
  it('should correctly parse http://aaa without double-prepending http://', () => {
    const res = parse("http://aaa");
    expect(res).not.toBeNull();
    expect((res as any).host).toBe("aaa");
  });
});