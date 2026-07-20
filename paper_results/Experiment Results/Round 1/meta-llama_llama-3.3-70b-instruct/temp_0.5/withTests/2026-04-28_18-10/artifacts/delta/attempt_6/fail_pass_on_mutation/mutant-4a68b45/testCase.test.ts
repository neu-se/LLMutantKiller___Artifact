import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Op length', () => {
  it('should return correct length for retain with object and number', () => {
    const op1 = { retain: { test: 'object' } };
    const op2 = { retain: 1 };
    expect(Op.length(op1)).toBe(1);
    expect(Op.length(op2)).toBe(1);
    expect(Op.length(op1) === Op.length(op2)).toBe(true);
    const op3 = { retain: { test: 'object' } };
    expect(Op.length(op3)).not.toBe(0);
  });
});