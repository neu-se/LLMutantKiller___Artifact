import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Op', () => {
  it('length() with different retain types', () => {
    const op1 = { retain: 2 };
    const op2 = { retain: { a: 1 } };
    expect(Op.length(op1)).toEqual(2);
    expect(Op.length(op2)).not.toEqual(1);
  });
});