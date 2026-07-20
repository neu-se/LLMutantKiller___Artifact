import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('composing a retain-null op with a delete should not push the delete op', () => {
    // thisOp.retain === null: typeof null === 'object' is true in JS
    // Original code: null !== null => false, so delete is NOT pushed => empty result
    // Mutated code: true => delete IS pushed => result has delete op
    const a = new Delta([{ retain: null as any }]);
    const b = new Delta([{ delete: 1 }]);
    const result = a.compose(b);
    expect(result.ops).toEqual([]);
  });
});