const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.post behavior with null name", () => {
  it("should apply the function directly when name is null", async () => {
    const testFn = jest.fn((a: number, b: number) => a + b);
    const promise = Q(testFn);

    // Call post with null name - should apply the function directly
    const result = await promise.post(null, [2, 3]);

    expect(testFn).toHaveBeenCalledWith(2, 3);
    expect(result).toBe(5);
  });
});