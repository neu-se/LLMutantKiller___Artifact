// <Jest test file containing exactly one test case>
import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe("invert() with null retain op", () => {
  it("should not throw when op.retain is null and should return baseIndex", () => {
    // Construct a delta with a retain: null op directly (bypassing the retain() method guard)
    const delta = new Delta([{ retain: null as any }]);
    const base = new Delta().insert("hello");

    // In the original code, typeof null === 'object' but null !== null is false,
    // so the branch is skipped and we just return baseIndex (no-op).
    // In the mutated code, typeof null === 'object' && true is true,
    // so it tries to call getEmbedTypeAndData(null, ...) which throws an error.
    expect(() => delta.invert(base)).not.toThrow();

    // The inverted delta should be empty (no operations) since retain: null is a no-op
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual([]);
  });
});