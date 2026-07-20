import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
  it("should use inspect() to determine valueOf behavior for rejected promises", () => {
    const error = new Error("test error");
    const rejectedPromise = Q.reject(error);

    // For a rejected promise, valueOf should return the promise itself
    expect(rejectedPromise.valueOf()).toBe(rejectedPromise);

    // Check that the exception property is set correctly
    expect(rejectedPromise.exception).toBe(error);

    return rejectedPromise.then(
      () => {
        throw new Error("Should not be fulfilled");
      },
      (reason) => {
        expect(reason).toBe(error);
      }
    );
  });
});