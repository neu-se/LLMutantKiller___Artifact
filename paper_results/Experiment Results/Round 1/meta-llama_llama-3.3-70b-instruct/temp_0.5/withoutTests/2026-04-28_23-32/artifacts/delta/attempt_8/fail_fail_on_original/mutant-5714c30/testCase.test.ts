import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle null thisData and object otherData', () => {
    const delta1 = new Delta().retain(1);
    const delta2 = new Delta().retain({ foo: 'bar' });
    const transformedDelta = delta1.transform(delta2, true);
    expect(transformedDelta.ops[0].retain).toBe(1);
  });
});