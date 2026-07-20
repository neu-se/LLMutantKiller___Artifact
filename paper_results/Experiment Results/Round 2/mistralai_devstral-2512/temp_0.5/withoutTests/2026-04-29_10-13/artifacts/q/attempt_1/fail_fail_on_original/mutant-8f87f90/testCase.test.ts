import { Q } from "./q.js";

describe("Q promise post method", () => {
  it("should correctly invoke method with arguments on fulfilled object", async () => {
    const obj = {
      method: jest.fn(function(arg1: string, arg2: number) {
        return arg1 + arg2;
      })
    };

    const promise = Q(obj);
    const result = await promise.post("method", ["test", 42]);

    expect(obj.method).toHaveBeenCalledWith("test", 42);
    expect(result).toBe("test42");
  });
});