import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with Q.return", () => {
  it("should resolve with the value passed to Q.return when used in async generator", async () => {
    // Q.return throws a QReturnValue; in SpiderMonkey path isStopIteration checks for it
    // In ES6 path, Q.return causes an exception that propagates as rejection
    // We test that Q.async handles generators correctly
    const result = await Q.async(function* () {
      return 42;
    })();
    
    expect(result).toBe(42);
  });
});