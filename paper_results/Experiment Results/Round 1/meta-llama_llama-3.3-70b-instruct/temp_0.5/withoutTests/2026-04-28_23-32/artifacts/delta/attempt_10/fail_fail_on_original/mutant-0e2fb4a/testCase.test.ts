import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle retain object correctly in invert method', () => {
    const delta = new Delta();
    delta.retain({ test: 'value' });
    const invertedDelta = delta.invert(new Delta());
    expect(invertedDelta.ops).toEqual([{ delete: 1 }]);
  });
});