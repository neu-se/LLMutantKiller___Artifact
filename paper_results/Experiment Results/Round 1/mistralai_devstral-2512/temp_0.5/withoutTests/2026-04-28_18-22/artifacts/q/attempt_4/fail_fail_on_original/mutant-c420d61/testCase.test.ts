const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly identify Node.js stack frames", () => {
    // Create a mock stack line that should be identified as Node.js
    const nodeStackLine = "at someFunction (node.js:123:45)";

    // This test directly checks the isNodeFrame function behavior
    // We need to access the internal function through the module
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const isNodeFrame = qModule.__test_get_isNodeFrame || (() => false);

    // The original code should identify this as a Node.js frame
    expect(isNodeFrame(nodeStackLine)).toBe(true);
  });
});