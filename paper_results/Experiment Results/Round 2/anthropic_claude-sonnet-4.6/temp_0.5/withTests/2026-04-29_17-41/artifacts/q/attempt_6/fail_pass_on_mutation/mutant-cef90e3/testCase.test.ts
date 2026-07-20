import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("then", () => {
  it("fulfilled promise should not be overwritten by rejection handler", () => {
    // A fulfilled promise dispatches the resolve callback with the value,
    // but the "when" rejection operand is also invoked (with undefined).
    // The done flag must prevent the rejection path from overwriting fulfillment.
    const p = Q(42);
    
    return p.then(
      function fulfilled(value: unknown) {
        return value;
      }
      // no rejection handler - _rejected returns reject(undefined)
      // which would overwrite if done guard is broken
    ).then(
      function(value: unknown) {
        expect(value).toBe(42);
      },
      function(reason: unknown) {
        throw new Error("Should not have rejected, got: " + reason);
      }
    );
  });
});