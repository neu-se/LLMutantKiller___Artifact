import { Q } from "./q.js";

describe("Q Promise", () => {
  it("should not throw error when progress listener is called and threw is false", () => {
    let threw = false;
    const promise = Q.defer();
    promise.promise.then(void 0, void 0, () => {
      if (threw) {
        throw new Error("Test error");
      }
    });
    expect(() => promise.notify()).not.toThrowError("Test error");
  });
});