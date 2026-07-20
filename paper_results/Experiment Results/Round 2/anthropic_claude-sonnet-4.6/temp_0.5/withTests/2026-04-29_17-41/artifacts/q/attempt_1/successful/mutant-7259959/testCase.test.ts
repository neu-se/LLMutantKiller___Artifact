import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with QReturnValue", () => {
  it("should resolve with the return value when Q.return is used in an async generator", async () => {
    // Q["return"] throws a QReturnValue; in environments without StopIteration,
    // the ES6 generator path is used. We test that Q.async resolves correctly.
    const asyncFn = Q.async(function* () {
      return 42;
    });

    const result = await asyncFn();
    expect(result).toBe(42);
  });
});