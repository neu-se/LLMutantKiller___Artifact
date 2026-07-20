import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function behavior", () => {
  it("should not execute debug code when module is required", () => {
    // The mutation changes the condition from `if (!module.parent)` to `if (module.parent)`
    // The debug code contains a debugger statement that will pause execution
    // We can detect this by checking if execution completes within a reasonable time

    let completed = false;
    const timeout = setTimeout(() => {
      completed = true;
    }, 100);

    const result = parse("http://example.com");

    clearTimeout(timeout);
    expect(completed).toBe(true);
    expect(result).toBeDefined();
  });
});