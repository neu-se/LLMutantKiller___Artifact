import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() with delete operation', () => {
  it('correctly inverts a delete operation without erroring due to mutated embed handler condition', () => {
    // A delta that deletes characters from a base document
    const delta = new Delta().retain(2).delete(3);
    const base = new Delta().insert('123456');

    // The expected inverted delta should re-insert the deleted characters
    const expected = new Delta().retain(2).insert('345');

    // In the mutated code, after handling the delete op in the first branch
    // (op.delete || typeof op.retain === 'number'), the condition `else if (true)`
    // will also be entered (since it's always true), attempting to call
    // getEmbedTypeAndData on op.retain which is undefined for a delete op,
    // throwing "cannot retain a undefined"
    const inverted = delta.invert(base);

    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});