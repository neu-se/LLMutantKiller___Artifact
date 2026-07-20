const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly identify Node.js stack frames", () => {
    // Create a test stack line that should be identified as a Node.js frame
    const nodeStackLine = "at someFunction (node.js:123:45)";
    const moduleStackLine = "at someFunction (module.js:123:45)";
    const normalStackLine = "at someFunction (/path/to/file.js:123:45)";

    // Access the internal function through the Q module
    const isNodeFrame = Q().constructor._getUnhandledReasons()[0].isNodeFrame;

    // Test that Node.js frames are correctly identified
    expect(isNodeFrame(nodeStackLine)).toBe(true);
    expect(isNodeFrame(moduleStackLine)).toBe(true);
    expect(isNodeFrame(normalStackLine)).toBe(false);
  });
});