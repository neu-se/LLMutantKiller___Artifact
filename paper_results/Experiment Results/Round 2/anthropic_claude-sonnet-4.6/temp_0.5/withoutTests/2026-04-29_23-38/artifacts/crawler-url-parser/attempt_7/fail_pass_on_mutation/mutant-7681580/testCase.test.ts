import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should correctly parse an https URL without a base URL", () => {
    const result = parse("https://example.com");
    expect(result).not.toBeNull();
    expect(result!.protocol).toBe("https:");
    expect(result!.host).toBe("example.com");
    expect(result!.url).toBe("https://example.com/");
  });
});