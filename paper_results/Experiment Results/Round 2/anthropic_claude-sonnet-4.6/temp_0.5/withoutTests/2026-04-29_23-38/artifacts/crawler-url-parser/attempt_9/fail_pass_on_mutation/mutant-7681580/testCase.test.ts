import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should parse a simple bare hostname correctly", () => {
    // Test with 'localhost' which is specifically excluded from the \w: check
    // and has no protocol, so it enters the prepend block
    // Both original and mutated should prepend http:// at position 0
    const result = parse("localhost");
    expect(result).not.toBeNull();
    expect(result!.host).toBe("localhost");
    expect(result!.protocol).toBe("http:");
    expect(result!.url).toBe("http://localhost/");
  });
});