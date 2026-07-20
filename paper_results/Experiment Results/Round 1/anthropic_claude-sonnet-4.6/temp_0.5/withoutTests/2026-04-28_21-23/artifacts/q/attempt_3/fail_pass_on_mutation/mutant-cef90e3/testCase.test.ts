import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then done flag", () => {
  it("fulfilled promise chain should not become rejected due to double-resolution", () => {
    let caughtError: any = null;
    let fulfilledValue: any = null;

    return Q(42)
      .then((v: number) => v)
      .then(
        (v: number) => { fulfilledValue = v; },
        (e: any) => { caughtError = e; }
      )
      .then(() => {
        expect(caughtError).toBeNull();
        expect(fulfilledValue).toBe(42);
      });
  });
});