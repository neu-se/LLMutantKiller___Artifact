import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with localhost URL", () => {
  it("should prepend http:// to localhost:port URL when no base URL is provided", () => {
    const result = parse("localhost:3000");
    // In the original code, localhost:3000 should get http:// prepended
    // because the regex anchors ^(?!localhost)\w+: prevents matching localhost at start
    // In the mutated code, (?!localhost)\w+: without anchor matches 'ocalhost:' 
    // so no http:// is prepended, resulting in null (no valid protocol)
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toContain("localhost");
  });
});