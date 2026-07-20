import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with firstOther.attributes == null and firstOther.retain', () => {
    const delta1 = new Delta().insert('A');
    const delta2 = new Delta().retain(1, { bold: true });
    const expected = new Delta().insert('A', { bold: true });
    expect(delta1.compose(delta2)).toEqual(expected);
    const delta3 = new Delta().retain(1);
    const delta4 = new Delta().insert('B');
    expect(delta3.compose(delta4).ops[0].insert).not.toEqual(delta4.ops[0].insert);
  });
});