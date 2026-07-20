import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with firstOther.attributes == null and firstOther.retain', () => {
    const delta1 = new Delta().insert('A');
    const delta2 = new Delta().retain(1);
    const expected = new Delta().insert('A');
    expect(delta1.compose(delta2).ops[0].attributes).toBeUndefined();
  });
});