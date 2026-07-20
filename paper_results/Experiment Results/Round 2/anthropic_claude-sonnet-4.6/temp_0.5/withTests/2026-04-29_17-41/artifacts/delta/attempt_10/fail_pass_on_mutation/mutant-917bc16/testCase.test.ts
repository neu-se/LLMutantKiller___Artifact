import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose()", () => {
  it("compose retain end optimization - large delta performance path produces correct result", () => {
    // Build a delta where b is much shorter than a
    // After b is exhausted, a still has many ops remaining
    // The optimization should trigger and return early via concat
    // Both paths should produce the same result - testing correctness
    const aOps = [];
    for (let i = 0; i < 100; i++) {
      aOps.push({ insert: String(i % 10) });
    }
    const a = new Delta(aOps);
    const b = new Delta().retain(1);
    const result = a.compose(b);

    // The result should contain all 100 characters from a
    const fullText = result.ops.reduce((acc: string, op: any) => {
      return acc + (typeof op.insert === 'string' ? op.insert : '');
    }, '');
    expect(fullText).toBe(Array.from({length: 100}, (_, i) => String(i % 10)).join(''));
    expect(result.ops.length).toBeGreaterThan(0);
    // Specifically check that the optimization path doesn't lose any ops
    expect(fullText.length).toBe(100);
  });
});