import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('composing retain-null op with delete: delete should not appear in result', () => {
    // { retain: null } - typeof null === 'object' is true in JS
    // Original: null !== null is false -> condition false -> delete NOT pushed
    // Mutated:  true -> condition true -> delete IS pushed
    const a = new Delta([{ retain: null as any }]);
    const b = new Delta([{ delete: 1 }]);
    const result = a.compose(b);
    expect(result.ops.filter((op) => typeof op.delete === 'number')).toHaveLength(0);
  });
});