import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.makePromise exception property", () => {
  it("fulfilled promise should not have exception property set", () => {
    const p = Q.makePromise(
      {
        "when": function() { return 42; }
      },
      function fallback(this: any) { return this; },
      function inspect() {
        return { state: "fulfilled", value: 42 };
      }
    );
    
    // Original: if (inspected.state === "rejected") - false for fulfilled, so exception not set
    // Mutated: if (true) - always sets exception (to undefined since no reason on fulfilled)
    expect((p as any).exception).toBeUndefined();
    // More specifically, the property should not exist at all
    expect(Object.prototype.hasOwnProperty.call(p, "exception")).toBe(false);
  });
});