import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap static method with null callback", () => {
  it("should reject when callback is null due to threw tracking in finally block", async () => {
    const Q_any = Q as any;

    // The method between Promise.prototype.then and Promise.prototype.tap
    // is Q.tap static, which uses threw to track errors in a try/catch/finally
    // threw=true (original): finally returns rejection when callback is invalid
    // threw=false (mutated): finally skips, catch returns Q(promise).tap(noop) -> resolves

    let resolvedValue: unknown = "NOT_RESOLVED";
    let rejectedError: unknown = null;

    await Q_any.tap(Q.resolve(42), null)
      .then(
        (val: unknown) => { resolvedValue = val; },
        (err: unknown) => { rejectedError = err; }
      );

    // With original code (threw=true): should reject, resolvedValue stays "NOT_RESOLVED"
    // With mutated code (threw=false): resolves with 42
    expect(resolvedValue).toBe("NOT_RESOLVED");
    expect(rejectedError).not.toBeNull();
  });
});