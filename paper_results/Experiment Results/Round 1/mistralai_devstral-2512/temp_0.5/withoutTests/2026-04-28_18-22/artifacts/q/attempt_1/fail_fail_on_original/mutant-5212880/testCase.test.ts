import { Q } from "./q";

describe("Q.done", () => {
  it("should return a promise when called with a promise and callbacks", () => {
    const promise = Q.resolve(42);
    const result = Q.done(promise, (value) => value, (error) => error, (progress) => progress);
    expect(result).toBeDefined();
    expect(typeof result.then).toBe("function");
  });
});