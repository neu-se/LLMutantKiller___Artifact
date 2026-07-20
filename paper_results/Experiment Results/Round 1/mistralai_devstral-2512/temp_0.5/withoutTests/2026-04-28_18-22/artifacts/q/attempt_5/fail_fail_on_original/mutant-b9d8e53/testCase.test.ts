const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly identify internal Q frames with multi-digit line numbers", () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Test error");
      })
      .catch((error: Error) => {
        // Get the internal function that checks if a frame is from Q
        const isInternalFrame = Q().then(() => {}).inspect().value.promiseDispatch
          .toString()
          .match(/function isInternalFrame\(([^)]+)\)/)?.[1];

        // Create a test stack line with a multi-digit line number
        const testStackLine = "at test (q.js:123:45)";

        // This will fail if the mutation breaks line number parsing
        // because the regex would only match single digits
        const result = isInternalFrame ? isInternalFrame(testStackLine) : false;

        // The original code should correctly parse "123" as the line number
        // The mutated code would fail to match because it expects only single digits
        expect(result).toBe(true);

        return Q.resolve();
      });

    return promise;
  });
});