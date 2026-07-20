import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('mutation detection via URL resolution', () => {
  it('should return null for a two-letter scheme URL even with baseUrl', () => {
    // "wp:///path" - original \w+: matches "wp:" -> protocol wp: -> not http/https -> null
    // mutated \w: does NOT match "wp:" -> prepends http:// -> "http://wp:///path"
    // This should parse differently
    const result = parse("wp:///path/page", "http://www.example.com/");
    expect(result).toBeNull();
  });
});