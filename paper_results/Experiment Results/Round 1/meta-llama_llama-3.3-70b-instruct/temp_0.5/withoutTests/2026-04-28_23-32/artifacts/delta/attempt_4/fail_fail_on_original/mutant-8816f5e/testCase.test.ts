import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should transform correctly when thisData is an object and otherData is null', () => {
    const delta1 = new Delta();
    delta1.retain({ embed: 'data1' }, {});
    const delta2 = new Delta();
    delta2.retain(null, {});
    const result = delta1.transform(delta2);
    expect(result.ops.length).toBe(1);
    expect(result.ops[0].retain).toEqual({ embed: 'data1' });
  });
});