import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should return an empty Delta when diffing with itself', () => {
    const delta = new Delta([{ insert: 'Hello World' }, { retain: 11 }]);
    const result = delta.diff(delta);
    expect(result.ops).toEqual([]);
  });
});