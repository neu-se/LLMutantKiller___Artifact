import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Op.length() with retain object', () => {
  it('should handle retain object with length property', () => {
    const op = { retain: { length: 3 } };
    expect(Op.length(op)).toBe(1);
  });
});