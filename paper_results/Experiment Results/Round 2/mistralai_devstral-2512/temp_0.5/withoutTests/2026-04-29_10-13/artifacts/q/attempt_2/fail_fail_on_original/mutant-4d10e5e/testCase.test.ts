import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace behavior", () => {
  it("should not include stack traces when hasStacks is false", () => {
    const error = new Error("Test error");
    const promise = Q.reject(error);

    return promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // In the original code (hasStacks = false), the error should not have a modified stack
        // In the mutated code (hasStacks = true), the stack would be modified
        expect(caughtError.stack).not.toContain("From previous event:");
      }
    );
  });
});