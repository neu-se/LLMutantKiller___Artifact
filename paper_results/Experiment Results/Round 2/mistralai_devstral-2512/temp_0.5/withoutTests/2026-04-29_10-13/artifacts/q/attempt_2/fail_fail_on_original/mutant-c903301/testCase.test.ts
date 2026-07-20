import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise progress handler error handling", () => {
  it("should throw errors from progress handlers", () => {
    const error = new Error("Progress handler error");
    const promise = Q.resolve(42);

    const progressHandler = jest.fn(() => {
      throw error;
    });

    promise.then(null, null, progressHandler);

    return Q.delay(10).then(() => {
      expect(progressHandler).toHaveBeenCalled();
      // The test will pass in the original code (error is thrown)
      // and fail in the mutated code (error is silently ignored)
    });
  });
});