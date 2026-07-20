import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fbind behavior", () => {
  it("should return a function that applies arguments correctly", async () => {
    const testFn = (a: number, b: number) => a + b;
    const boundFn = Q.fbind(testFn, 1);
    const result = await boundFn(2);
    expect(result).toBe(3);
  });
});