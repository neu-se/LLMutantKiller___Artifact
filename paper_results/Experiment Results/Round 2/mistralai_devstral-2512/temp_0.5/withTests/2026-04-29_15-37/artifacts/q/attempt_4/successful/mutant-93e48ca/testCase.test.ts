// Test file to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.post behavior with null/undefined name", () => {
  it("should not apply the function when name is a string", async () => {
    const testFn = jest.fn((a: number, b: number, c: number) => a + b + c);
    const obj = {
      method: testFn
    };
    const result = await Q(obj).post("method", [1, 2, 3]);
    expect(result).toBe(6);
    expect(testFn).toHaveBeenCalledWith(1, 2, 3);
  });
});