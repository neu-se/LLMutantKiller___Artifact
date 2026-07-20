import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should handle URL starting with // when no base URL is provided", () => {
    // A URL like '//example.com' gets converted by line 24 to 'http://example.com'
    // before reaching the placeholder. The placeholder handles the case where
    // after the http:// prepend regex, the URL still starts with //.
    // This happens when the input doesn't start with // but somehow the prepend creates //.
    // The regex /^(?!(?:\w+:)?\/\/)/ matches empty string at start if not followed by protocol+//
    // For input like '//example.com', line 24 converts it first.
    // But what about a URL that passes the outer if condition AND starts with //?
    // The outer regex /^\.*\/|^(?!localhost)\w+:/ - '//example.com' matches /^\.*\// so it's excluded.
    // So the placeholder is only reachable if currentUrlStr doesn't start with / and doesn't have protocol.
    // After the prepend, it would be 'http://example.com', not starting with //.
    // The placeholder seems unreachable... unless input is something weird.
    // Let me try: what if currentUrlStr after line 24 is something that the regex doesn't match
    // but starts with //? That's impossible since // starts with /.
    const result = parse("//example.com/path");
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("example.com");
  });
});