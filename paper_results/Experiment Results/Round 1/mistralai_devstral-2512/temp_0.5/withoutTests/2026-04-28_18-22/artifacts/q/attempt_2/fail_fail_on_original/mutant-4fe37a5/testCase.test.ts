import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise fallback behavior", () => {
  it("should reject with an error when an unsupported operation is called on a promise", () => {
    const promise = Q.makePromise({});
    return expect(promise.dispatch("unsupportedOperation", [])).rejects.toThrow(
      "Promise does not support operation: unsupportedOperation"
    );
  });
});