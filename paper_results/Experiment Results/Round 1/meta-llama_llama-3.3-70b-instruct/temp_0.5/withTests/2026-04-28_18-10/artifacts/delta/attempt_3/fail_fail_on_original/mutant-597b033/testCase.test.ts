import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle module exports', () => {
    const delta = new Delta();
    expect(typeof module.exports).toBe('object');
    expect(module.exports).toEqual(Delta);
    expect(module.exports.default).toEqual(Delta);
  });
});