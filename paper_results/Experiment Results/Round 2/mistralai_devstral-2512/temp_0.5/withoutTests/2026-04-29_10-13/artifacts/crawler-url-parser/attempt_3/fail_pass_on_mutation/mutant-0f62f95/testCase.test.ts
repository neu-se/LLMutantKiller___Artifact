import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function behavior", () => {
  it("should not execute the debug code block when module is not the main module", () => {
    // This test verifies that the debug code block at the bottom of the file
    // is not executed when the module is required as a dependency
    const originalLog = console.log;
    console.log = jest.fn();

    const result = parse("http://example.com");
    expect(console.log).not.toHaveBeenCalled();

    console.log = originalLog;
    expect(result).not.toBeNull();
  });
});