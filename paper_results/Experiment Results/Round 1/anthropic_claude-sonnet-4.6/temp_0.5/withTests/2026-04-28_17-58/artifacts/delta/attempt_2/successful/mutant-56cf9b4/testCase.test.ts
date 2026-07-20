import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert()', () => {
  it('should not produce spurious retain ops when retain has falsy non-null attributes followed by delete', () => {
    // The mutation changes: else if (op.retain && op.attributes)
    //                   to: else if (true)
    // inside invert()'s slice.forEach loop.
    //
    // When a retain op has a falsy-but-not-null/undefined attributes value (e.g. false),
    // it bypasses the early branch (which only catches null/undefined via == null),
    // enters the outer branch, but in the original code the inner else-if evaluates to false
    // so nothing is added. In the mutated code, else-if(true) fires and adds a spurious retain.
    //
    // The following delete ensures the spurious retain is not removed by chop().
    const delta = new Delta([
      { retain: 3, attributes: false as any },
      { delete: 2 },
    ]);
    const base = new Delta().insert('abcde');
    const inverted = delta.invert(base);
    // Original: [{ insert: 'de' }]
    // Mutated:  [{ retain: 3 }, { insert: 'de' }]
    expect(inverted).toEqual(new Delta().insert('de'));
  });
});