import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle embed types correctly', () => {
    const delta1 = new Delta().insert({ embed: 'value1' });
    const delta2 = new Delta().insert({ embed: 'value2' });
    const transformedDelta = delta1.transform(delta2, true);
    expect(transformedDelta.ops[0].insert).toEqual({ embed: 'value2' });
  });
});