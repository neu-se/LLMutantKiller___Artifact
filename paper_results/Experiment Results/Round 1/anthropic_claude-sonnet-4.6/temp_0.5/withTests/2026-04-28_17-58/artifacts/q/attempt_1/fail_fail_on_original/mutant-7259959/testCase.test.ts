import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with Q.return", () => {
  it("should resolve with the value passed to Q.return when used in an async generator", async () => {
    // Q["return"] throws a QReturnValue, and Q.async should handle it
    // by resolving the promise with that value (not rejecting)
    const asyncFn = Q.async(function* () {
      Q["return"](42);
    });

    const result = await asyncFn();
    expect(result).toBe(42);
  });
});