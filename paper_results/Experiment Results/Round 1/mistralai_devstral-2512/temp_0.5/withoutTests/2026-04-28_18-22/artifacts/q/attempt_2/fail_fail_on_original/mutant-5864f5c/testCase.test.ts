const Q = require("./q");

describe("isStopIteration mutation", () => {
  it("should correctly identify StopIteration exceptions", () => {
    // Create a mock StopIteration exception
    const stopIteration = { toString: () => "[object StopIteration]" };
    // Create a non-StopIteration exception
    const normalError = new Error("test");

    // Test that isStopIteration returns true for StopIteration
    expect(Q.isStopIteration(stopIteration)).toBe(true);
    // Test that isStopIteration returns false for normal errors
    expect(Q.isStopIteration(normalError)).toBe(false);
  });
});