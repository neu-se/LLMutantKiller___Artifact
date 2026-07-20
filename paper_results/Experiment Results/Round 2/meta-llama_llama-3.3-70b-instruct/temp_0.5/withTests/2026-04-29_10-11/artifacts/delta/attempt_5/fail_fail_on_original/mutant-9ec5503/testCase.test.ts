import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with firstOther.attributes == null and firstOther.retain', () => {
    const delta1 = new Delta().insert('A');
    const delta2 = new Delta().retain(1);
    const delta3 = new Delta().insert('B');
    const result = delta1.compose(delta2);
    expect(result.ops[0].insert).toBe('A');
    expect(result.compose(delta3).ops[0].insert).toBe('B');
  });
});