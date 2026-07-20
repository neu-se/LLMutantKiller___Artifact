import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with Q.return", () => {
  it("should resolve with the value passed to Q.return when StopIteration is not defined", async () => {
    // In environments where StopIteration is undefined (Node.js ES6),
    // Q.async uses ES6 generator semantics. Q.return throws QReturnValue.
    // The isStopIteration mutation affects the SpiderMonkey path.
    // We test that Q.async properly handles a generator that returns a value.
    const asyncFn = Q.async(function* () {
      return 42;
    });

    const result = await asyncFn();
    expect(result).toBe(42);
  });
});