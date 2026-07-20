import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_defineProperty mutation detection", () => {
  it("should preserve the original rejection reason through a then chain with long stack support enabled", async () => {
    Q.longStackSupport = true;

    const originalError = new Error("original specific error");

    // Chain two .then calls - the second rejection handler triggers makeStackTraceLong
    // on the error from the first rejection, calling object_defineProperty
    let finalError: any = null;

    await Q.reject(originalError)
      .then(
        () => { throw new Error("should not fulfill"); },
        (err) => {
          // Re-reject to trigger makeStackTraceLong in the next handler
          throw err;
        }
      )
      .then(
        () => { throw new Error("should not fulfill"); },
        (err) => {
          finalError = err;
        }
      );

    // On original code: finalError is originalError
    // On mutated code: object_defineProperty(false) throws TypeError in makeStackTraceLong,
    // caught by _rejected's try-catch, so finalError is a TypeError
    expect(finalError).toBeInstanceOf(Error);
    expect(finalError.message).toBe("original specific error");
  });
});