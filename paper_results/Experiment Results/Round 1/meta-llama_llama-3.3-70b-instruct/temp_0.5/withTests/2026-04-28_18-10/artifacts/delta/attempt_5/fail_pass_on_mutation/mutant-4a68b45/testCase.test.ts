import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Op length', () => {
  it('should return correct length for different operations', () => {
    const op1 = { retain: 5 };
    const op2 = { retain: { test: 'object' } };
    expect(Op.length(op1)).toBe(5);
    expect(Op.length(op2)).toBe(1);
    expect(Op.length(op1)).not.toBe(Op.length(op2));
  });
});