const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library mutation test", () => {
  it("should correctly handle async generator with QReturnValue", () => {
    // Create a mock generator function that uses Q.return
    const mockGenerator = function*() {
      yield 1;
      // This should trigger the QReturnValue check
      Q["return"]("test value");
    };

    // Test that the async function properly handles QReturnValue
    return Q.async(mockGenerator)()
      .then((result: any) => {
        // If we get here with the correct value, the QReturnValue was properly handled
        expect(result).toBe("test value");
      })
      .catch((error: any) => {
        // If we get here, the test fails
        throw new Error("QReturnValue was not properly handled");
      });
  });
});