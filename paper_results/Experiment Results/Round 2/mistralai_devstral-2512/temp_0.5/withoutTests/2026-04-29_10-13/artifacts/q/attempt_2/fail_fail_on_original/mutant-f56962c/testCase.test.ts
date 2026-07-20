import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.fcall", () => {
  it("should invoke the function with the correct arguments and return a promise", async () => {
    const testFn = jest.fn((a: number, b: number) => a + b);
    const promise = Q(testFn);
    const result = await promise.fcall(2, 3);
    expect(testFn).toHaveBeenCalledWith(2, 3);
    expect(result).toBe(5);
  });
});