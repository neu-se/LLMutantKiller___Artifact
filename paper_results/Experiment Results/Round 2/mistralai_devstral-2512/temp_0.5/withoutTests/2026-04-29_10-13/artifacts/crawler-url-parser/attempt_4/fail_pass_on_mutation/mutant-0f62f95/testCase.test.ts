import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function behavior", () => {
  it("should not execute debug code when module is required", () => {
    // The mutation changes the condition from `if (!module.parent)` to `if (module.parent)`
    // This means the debug code will execute when the module is required (mutated)
    // but not when it's the main module (original)
    const originalExit = process.exit;
    process.exit = jest.fn();

    // This should not trigger process.exit in original code
    // but will trigger it in mutated code
    parse("test");

    expect(process.exit).not.toHaveBeenCalled();
    process.exit = originalExit;
  });
});