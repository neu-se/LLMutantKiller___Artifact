import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with firstOther.attributes == null and firstOther.retain', () => {
    const delta1 = new Delta().insert('A');
    const delta2 = new Delta().retain(1);
    const composedResult = delta1.compose(delta2);
    expect(composedResult.ops[0].insert).toBe('A');
    expect(composedResult.ops[0].attributes).toBeUndefined();
  });
});