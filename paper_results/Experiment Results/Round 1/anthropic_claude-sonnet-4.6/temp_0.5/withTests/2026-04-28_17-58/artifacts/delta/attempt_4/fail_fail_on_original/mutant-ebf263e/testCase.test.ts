import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain more than length of text followed by insert produces no trailing retain', () => {
    const a = new Delta().insert('Hello');
    const b = new Delta().retain(10).insert('!');
    const result = a.compose(b);
    // With the optimization, the retain(10) is consumed by the 5 inserts,
    // leaving no leftover retain, so the result should not contain any retain op
    const hasRetain = result.ops.some(op => op.retain != null);
    expect(hasRetain).toBe(false);
  });
});