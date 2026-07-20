import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q Promise", () => {
  it("should not throw when creating a promise with a defined fallback", () => {
    const fallback = function(op) {
      return Q.reject(new Error("Promise does not support operation: " + op));
    };
    const promise = Q.Promise({}, fallback);
    expect(promise).toBeDefined();
  });
});