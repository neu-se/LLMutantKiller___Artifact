import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Op.length() with retain object', () => {
  it('should return 1 for retain object', () => {
    const op = { retain: { test: true } };
    expect(Op.length(op)).toBe(1);
  });
});