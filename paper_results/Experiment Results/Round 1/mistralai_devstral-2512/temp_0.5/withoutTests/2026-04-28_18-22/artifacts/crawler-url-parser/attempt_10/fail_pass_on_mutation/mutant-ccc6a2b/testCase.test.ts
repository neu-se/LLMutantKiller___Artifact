import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("module execution behavior", () => {
  it("should not hang on debugger when loaded as module", () => {
    // This test verifies the module doesn't hang on debugger
    // The original code has a debugger statement in the debug block
    // The mutated code removes this block entirely
    const startTime = Date.now();
    const result = parse("https://example.com");
    const endTime = Date.now();

    // If the debugger was hit, this would take much longer
    expect(endTime - startTime).toBeLessThan(1000);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("https://example.com/");
  });
});