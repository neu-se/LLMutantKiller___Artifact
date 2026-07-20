import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() mutation detection', () => {
  it('correctly inverts a delta with insert ops - insert ops should produce delete in inverted delta', () => {
    // A delta that inserts text - when inverted, should produce a delete
    const delta = new Delta().retain(2).insert('AB', { italic: true });
    const base = new Delta().insert('123456');

    // The expected inverted delta: the insert becomes a delete
    const expected = new Delta().retain(2).delete(2);

    // In the mutated code, the `else if (true)` branch will be entered for the insert op
    // (since it's not a delete or numeric retain), causing getEmbedTypeAndData to be called
    // on op.retain which is undefined for an insert op, throwing an error
    const inverted = delta.invert(base);

    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});