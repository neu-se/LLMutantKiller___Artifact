import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta module export', () => {
  it('should export Delta class', () => {
    const delta = new Delta().insert('test');
    expect(delta).toBeInstanceOf(Delta);
    expect(delta.ops).toEqual([{ insert: 'test' }]);
  });
});