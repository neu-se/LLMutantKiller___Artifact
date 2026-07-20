import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert()', () => {
  it('should not throw when inverting a delta with a null retain op', () => {
    // Construct a delta with retain: null (edge case)
    // Original: typeof null === 'object' && null !== null => false => falls through, returns baseIndex unchanged
    // Mutated: typeof null === 'object' && true => true => calls getEmbedTypeAndData(null, ...) => throws "cannot retain a null"
    const delta = new Delta([{ retain: null as any }]);
    const base = new Delta().insert('hello');
    expect(() => delta.invert(base)).not.toThrow();
  });
});