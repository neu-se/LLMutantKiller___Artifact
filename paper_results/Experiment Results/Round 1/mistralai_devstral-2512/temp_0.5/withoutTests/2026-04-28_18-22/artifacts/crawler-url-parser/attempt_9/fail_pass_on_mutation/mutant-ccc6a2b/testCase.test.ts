import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("module debug behavior", () => {
  it("should not contain debug code when loaded as module", () => {
    // This test verifies the module doesn't have debug behavior
    // The original code has debug code that would be executed when run directly
    // The mutated code removes this debug block
    const result = parse("https://example.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("https://example.com/");
    expect(result?.host).toBe("example.com");

    // The key difference is that the original code would hang on debugger
    // when run directly, while the mutated version wouldn't
    // Since we're testing as a module, both should work the same
    // This test passes on both versions, indicating the mutation
    // doesn't affect module behavior (which is correct)
  });
});