import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle module exports when module is an object', () => {
    if (typeof module === 'object') {
      expect(module.exports).toEqual(Delta);
      expect(module.exports.default).toEqual(Delta);
    } else {
      throw new Error('module is not an object');
    }
  });
});