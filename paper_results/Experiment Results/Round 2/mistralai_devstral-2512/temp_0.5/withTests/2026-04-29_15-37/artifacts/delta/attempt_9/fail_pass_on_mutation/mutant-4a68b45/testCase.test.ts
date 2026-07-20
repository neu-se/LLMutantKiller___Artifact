import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op.length()', () => {
  it('should handle retain with object value correctly', () => {
    const op1 = { retain: { key: 'value' } };
    const op2 = { retain: null };
    expect(Op.length(op1)).toEqual(1);
    expect(Op.length(op2)).toEqual(1);
  });
});