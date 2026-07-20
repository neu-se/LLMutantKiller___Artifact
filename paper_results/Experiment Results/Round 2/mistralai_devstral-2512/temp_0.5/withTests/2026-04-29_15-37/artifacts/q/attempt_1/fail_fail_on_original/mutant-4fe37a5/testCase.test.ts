import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise fallback behavior", () => {
  it("should reject with an error when an unsupported operation is called on a promise", () => {
    const promise = Q.makePromise({});
    return promise.dispatch("unsupportedOperation", []).then(
      () => {
        throw new Error("Expected promise to be rejected");
      },
      (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toContain("Promise does not support operation: unsupportedOperation");
      }
    );
  });
});