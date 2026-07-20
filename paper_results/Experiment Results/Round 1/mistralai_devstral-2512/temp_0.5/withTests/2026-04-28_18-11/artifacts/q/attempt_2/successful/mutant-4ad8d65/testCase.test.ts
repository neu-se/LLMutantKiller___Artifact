// Test case to detect the mutation in Q.try
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.try mutation test", () => {
  it("should correctly apply function with arguments", async () => {
    const testFn = (a: number, b: number, c: number) => a + b + c;
    const result = await Q["try"](testFn, 1, 2, 3);
    expect(result).toBe(6);
  });
});