import { Q } from "./q";

describe("Q.when", () => {
  it("should resolve a value with the fulfilled callback", (done) => {
    const value = 42;
    Q.when(value, (result) => {
      expect(result).toBe(value);
      done();
    });
  });
});