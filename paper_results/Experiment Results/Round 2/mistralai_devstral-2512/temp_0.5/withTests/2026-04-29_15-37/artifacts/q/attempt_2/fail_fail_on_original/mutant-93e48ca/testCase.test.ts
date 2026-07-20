// Test file to detect the mutation in q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.post behavior with null/undefined name", () => {
  it("should apply the function when name is null or undefined", async () => {
    const testFn = jest.fn((a: number, b: number, c: number) => a + b + c);
    const result = await Q(testFn).post(undefined, [1, 2, 3]);
    expect(result).toBe(6);
    expect(testFn).toHaveBeenCalledWith(1, 2, 3);
  });
});