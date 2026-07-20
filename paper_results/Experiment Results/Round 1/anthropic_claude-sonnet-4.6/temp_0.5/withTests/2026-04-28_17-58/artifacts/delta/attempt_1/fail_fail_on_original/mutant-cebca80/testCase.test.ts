import Delta from '../../src/Delta';

describe('invert() with delete operation', () => {
  it('correctly inverts a delete operation without falling into embed handler', () => {
    // A delta that deletes characters from a base document
    const delta = new Delta().retain(2).delete(3);
    const base = new Delta().insert('123456');
    
    // The expected inverted delta should re-insert the deleted characters
    const expected = new Delta().retain(2).insert('345');
    
    // In the mutated code, after handling the delete op in the first branch,
    // it will also try to execute the embed retain handler (else if (true)),
    // which will call getEmbedTypeAndData on op.retain (undefined for delete),
    // causing an error like "cannot retain a undefined"
    const inverted = delta.invert(base);
    
    expect(inverted).toEqual(expected);
    // Also verify the round-trip works
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});