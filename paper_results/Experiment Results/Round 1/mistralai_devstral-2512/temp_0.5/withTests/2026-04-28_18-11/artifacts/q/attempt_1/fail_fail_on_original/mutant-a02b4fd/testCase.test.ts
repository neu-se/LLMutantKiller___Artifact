// Test case to detect the mutation in the post method of the fulfill function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("fulfill post method behavior", () => {
  it("should apply the function directly when name is null", async () => {
    const testFn = jest.fn((a: number, b: number, c: number) => a + b + c);
    const result = await Q(testFn).post(null, [1, 2, 3]);
    expect(result).toBe(6);
    expect(testFn).toHaveBeenCalledWith(1, 2, 3);
  });
});