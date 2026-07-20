import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('compose with null retain and delete', () => {
    const a = new Delta([{ retain: null as any }]);
    const b = new Delta([{ delete: 1 }]);
    const result = a.compose(b);
    // If OpIterator produces retain: null, then:
    // Original: delete NOT pushed (null !== null is false)
    // Mutated: delete IS pushed (true)
    expect(result.ops).toHaveLength(0);
  });
});