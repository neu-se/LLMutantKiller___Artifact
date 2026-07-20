import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert', () => {
  it('invert with delete followed by retain-with-attributes', () => {
    const base = new Delta().insert('Hello World');
    const change = new Delta().delete(5).retain(6, { bold: true });
    const inverted = change.invert(base);
    // Original: insert('Hello') + (retain-with-attrs handled by forEach with true condition)
    // The inner else-if (true) means retain IS added for number retain with attrs
    // So original: insert('Hello') + retain(6, {bold:null})
    // If mutation removes return, baseIndex wrong for second op
    expect(inverted).toEqual(new Delta().insert('Hello').retain(6, { bold: null }));
  });
});