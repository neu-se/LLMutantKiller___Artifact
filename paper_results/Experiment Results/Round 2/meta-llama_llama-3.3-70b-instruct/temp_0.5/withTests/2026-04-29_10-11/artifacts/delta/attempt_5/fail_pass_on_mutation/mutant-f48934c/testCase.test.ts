import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not insert an empty string and have ops length 0 when arg is empty string', () => {
    const delta = new Delta();
    const arg = '';
    delta.insert(arg);
    expect(delta.ops).toEqual([]);
  });
});