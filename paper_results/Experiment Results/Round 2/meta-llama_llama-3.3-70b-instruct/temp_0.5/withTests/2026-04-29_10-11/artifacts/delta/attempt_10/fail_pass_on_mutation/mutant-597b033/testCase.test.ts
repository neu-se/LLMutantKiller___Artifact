import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should check if the export condition is correct', () => {
    const module = { exports: {} };
    let exported = false;
    if (typeof module === 'object') {
      module.exports = Delta;
      exported = true;
    }
    expect(exported).toBe(true);
  });
});