import { Q } from "./q.js";

describe("Q.post method", () => {
  it("should pass arguments correctly to the dispatched method", () => {
    const obj = {
      method: jest.fn((arg1: string, arg2: string) => arg1 + arg2)
    };

    const promise = Q(obj);
    return promise.post("method", ["Hello", "World"]).then((result) => {
      expect(result).toBe("HelloWorld");
      expect(obj.method).toHaveBeenCalledWith("Hello", "World");
    });
  });
});