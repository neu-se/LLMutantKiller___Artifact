import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transforms correctly when otherData is an object', () => {
    const delta1 = new Delta().retain(13);
    const delta2 = new Delta().retain({ foo: 'bar' });
    const transformedDelta = delta1.transform(delta2, false);
    expect(typeof transformedDelta.ops[0].retain).toBe('number');
  });
});