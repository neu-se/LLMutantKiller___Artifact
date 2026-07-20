import { promise } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("promise constructor", () => {
  it("should execute the resolver function when provided", () => {
    let resolverCalled = false;
    const testPromise = promise((resolve) => {
      resolverCalled = true;
      resolve("test");
    });
    expect(resolverCalled).toBe(true);
    return testPromise.then((value) => {
      expect(value).toBe("test");
    });
  });
});