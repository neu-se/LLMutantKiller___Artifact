import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly transform retain data', () => {
    const delta1 = new Delta().retain(10);
    const delta2 = new Delta().retain(5);
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops).not.toHaveLength(0);
  });
});