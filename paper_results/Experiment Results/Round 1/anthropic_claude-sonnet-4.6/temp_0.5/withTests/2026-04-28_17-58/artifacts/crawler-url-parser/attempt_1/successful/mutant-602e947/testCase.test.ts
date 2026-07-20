import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with colon in path but no protocol', () => {
  it('should prepend http:// to a relative URL containing a colon in the middle when no baseUrl is provided', () => {
    // "path/sub:value" has no leading protocol, no leading ./ or /
    // Original: ^(?!localhost)\w+: does NOT match at start (starts with 'p', but 'path/sub:' - the ^ anchors to start)
    // Wait - "path" does match \w+ at start, then no colon immediately after...
    // Let me use "abc/def:ghi" - starts with \w+ but colon is not right after start
    // Original regex: ^(?!localhost)\w+: requires colon right after word chars at START
    // "abc/def:ghi" - at start: \w+ matches "abc" but then "/" not ":", so ^ anchored version fails
    // Mutated: \w+: anywhere - matches "def:" in the middle
    const result = parse("abc/def:ghi");
    // Original: http:// prepended -> "http://abc/def:ghi" -> parsed as http://abc/def:ghi
    // Mutated: NOT prepended (matched \w+: in middle) -> stays as "abc/def:ghi" -> no host -> url is "abc/def:ghi"
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://abc/def:ghi");
  });
});