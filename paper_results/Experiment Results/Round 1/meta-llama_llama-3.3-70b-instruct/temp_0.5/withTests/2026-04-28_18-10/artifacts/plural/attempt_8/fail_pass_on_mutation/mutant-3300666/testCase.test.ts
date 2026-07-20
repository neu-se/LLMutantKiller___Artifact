import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should correctly handle rules array initialization', () => {
    expect(plural('')).toBe('s');
    expect(plural('Stryker was here')).toBe('Stryker was heres');
  });
});