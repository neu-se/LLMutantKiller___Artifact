import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function behavior", () => {
  it("should not be affected by debug code execution when module is required", () => {
    // The mutation changes when debug code executes
    // In mutated version, debug code runs when module is required
    // The debug code calls parse() with an invalid URL containing a space
    // This should cause the module to behave differently

    // First call to parse should work normally
    const result1 = parse("https://example.com");
    expect(result1).not.toBeNull();
    expect(result1?.url).toBe("https://example.com/");

    // In mutated version, debug code would have executed and called parse with invalid URL
    // This might affect subsequent calls or module state
    // We test that the module remains in a consistent state
    const result2 = parse("https://test.com");
    expect(result2).not.toBeNull();
    expect(result2?.url).toBe("https://test.com/");
  });
});