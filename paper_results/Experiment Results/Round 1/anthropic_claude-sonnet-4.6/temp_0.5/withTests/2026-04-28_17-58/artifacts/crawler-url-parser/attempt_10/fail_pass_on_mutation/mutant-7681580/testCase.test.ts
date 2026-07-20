import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL mutation detection', () => {
  it('should correctly handle a URL with localhost and port without double-prepending', () => {
    const result = parse("localhost:3000/api/endpoint");
    expect(result).not.toBeNull();
    expect((result as any).url).toBe("http://localhost:3000/api/endpoint");
  });
});