import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Op.length() with retain object', () => {
  it('should return 1 for object retain operations', () => {
    const op = { retain: { custom: true } };
    expect(Op.length(op)).toBe(1);
  });
});