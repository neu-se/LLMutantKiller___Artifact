import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong __minimumStackCounter__ configurable property", () => {
  it("should not throw when makeStackTraceLong is called multiple times on the same error object", async () => {
    Q.longStackSupport = true;

    // Create a chain where the same error object passes through makeStackTraceLong
    // multiple times. With original code, __minimumStackCounter__ is configurable,
    // so it can be redefined on subsequent calls without error.
    // With mutated code, __minimumStackCounter__ is NOT configurable (default),
    // so the second attempt to define it throws a TypeError.

    const d1 = Q.defer();
    const d2 = Q.defer();
    const d3 = Q.defer();

    let caughtError: Error | null = null;
    let unexpectedError: Error | null = null;

    // Chain: rejection propagates through multiple .fail handlers that re-throw,
    // each triggering makeStackTraceLong on the same error object.
    const chain = d1.promise
      .then(function () { return d2.promise; })
      .then(function () { return d3.promise; })
      .fail(function (e: Error) {
        // First makeStackTraceLong call happens here
        throw e; // re-throw to trigger second call
      })
      .fail(function (e: Error) {
        // Second makeStackTraceLong call happens here
        // With mutation: this throws TypeError because property is not configurable
        throw e; // re-throw to trigger third call
      })
      .fail(function (e: Error) {
        // Third makeStackTraceLong call
        caughtError = e;
      })
      .fail(function (e: Error) {
        unexpectedError = e;
      });

    d1.resolve(undefined);
    d2.resolve(undefined);
    d3.reject(new Error("test error for stack trace"));

    await chain;

    // With original: all calls succeed, caughtError is set, unexpectedError is null
    // With mutation: second or third call throws TypeError (non-configurable property),
    // which gets caught and becomes unexpectedError
    expect(unexpectedError).toBeNull();
    expect(caughtError).not.toBeNull();
    expect(caughtError!.message).toBe("test error for stack trace");
  });
});