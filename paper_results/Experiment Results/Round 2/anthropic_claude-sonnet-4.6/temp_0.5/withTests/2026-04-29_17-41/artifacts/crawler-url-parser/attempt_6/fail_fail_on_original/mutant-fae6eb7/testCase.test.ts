import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl fragment stripping edge case', () => {
  it('should correctly use baseUrl after stripping fragment when resolving relative URL', () => {
    // Use a relative URL that requires the baseUrl to be correctly stripped
    // to resolve properly - if baseUrl fragment isn't fully stripped,
    // URL.resolve will produce wrong result
    const result = parse("../sibling", "http://www.example.com/aaa/bbb#anchor");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/aaa/sibling");
  });
});