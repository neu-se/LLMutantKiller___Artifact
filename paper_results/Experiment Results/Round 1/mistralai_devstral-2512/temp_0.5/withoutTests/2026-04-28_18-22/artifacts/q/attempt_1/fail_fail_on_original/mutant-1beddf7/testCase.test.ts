import { promise } from "./q";

describe("Promise constructor", () => {
  it("should execute the resolver function when provided", (done) => {
    let resolverCalled = false;
    const testPromise = promise((resolve) => {
      resolverCalled = true;
      resolve("test");
    });

    testPromise.then((value) => {
      expect(resolverCalled).toBe(true);
      expect(value).toBe("test");
      done();
    });
  });
});