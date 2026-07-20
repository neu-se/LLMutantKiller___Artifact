import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should throw error when progress listener is called and threw is true", () => {
    let threw = true;
    const promise = Q.defer();
    promise.promise.then(void 0, void 0, () => {
      if (threw) {
        throw new Error("Test error");
      }
    });
    expect(() => promise.notify()).toThrowError("Test error");
  });
});