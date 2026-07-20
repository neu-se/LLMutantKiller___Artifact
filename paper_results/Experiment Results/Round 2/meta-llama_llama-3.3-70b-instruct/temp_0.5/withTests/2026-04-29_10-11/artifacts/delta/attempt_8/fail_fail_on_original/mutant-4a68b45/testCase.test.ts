import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Op', () => {
  it('length() with different retain types', () => {
    const op1 = { retain: null };
    const op2 = { retain: {} };
    expect(Op.length(op1)).not.toEqual(Op.length(op2));
  });
});