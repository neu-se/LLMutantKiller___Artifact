import { Q } from "./q.js";

describe("Promise.prototype.post", () => {
  it("should resolve with the result of calling the method with the given name and arguments", async () => {
    const obj = {
      testMethod: jest.fn((a: number, b: number) => a + b)
    };
    const promise = Q(obj);
    const result = await promise.post("testMethod", [2, 3]);
    expect(result).toBe(5);
    expect(obj.testMethod).toHaveBeenCalledWith(2, 3);
  });
});