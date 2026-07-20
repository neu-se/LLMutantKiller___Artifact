import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl containing fragment', () => {
  it('should resolve relative URL correctly when baseUrl has a fragment', () => {
    const result = parse("../sibling", "http://www.example.com/aaa/bbb#anchor");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/sibling");
  });
});