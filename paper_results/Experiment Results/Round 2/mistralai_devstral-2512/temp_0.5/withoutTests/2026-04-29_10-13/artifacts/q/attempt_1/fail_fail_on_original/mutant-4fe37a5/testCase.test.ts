import { Q } from "./q.js";

describe("Promise fallback behavior", () => {
  it("should reject with an error when an unsupported operation is performed", () => {
    const promise = Q.makePromise({}, undefined);
    return expect(promise.dispatch("unsupportedOperation", [])).rejects.toThrow(
      "Promise does not support operation: unsupportedOperation"
    );
  });
});