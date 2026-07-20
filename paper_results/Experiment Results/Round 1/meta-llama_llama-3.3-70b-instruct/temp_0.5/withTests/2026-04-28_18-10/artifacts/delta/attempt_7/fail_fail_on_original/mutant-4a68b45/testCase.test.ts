import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Op length', () => {
  it('should return correct length for retain with object', () => {
    const op = { retain: { test: 'object' } };
    const op2 = { retain: 1 };
    expect(Op.length(op)).not.toBe(Op.length(op2));
  });
});