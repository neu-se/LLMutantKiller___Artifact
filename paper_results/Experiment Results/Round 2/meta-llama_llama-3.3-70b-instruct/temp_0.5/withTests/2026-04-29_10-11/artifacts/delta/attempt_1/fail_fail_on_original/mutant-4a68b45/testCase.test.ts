import { Op } from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Op', () => {
  it('length() with mutated retain', () => {
    const op1 = { retain: { a: 1 } };
    const op2 = { retain: 2 };
    expect(Op.length(op1)).toEqual(1);
    expect(Op.length(op2)).toEqual(2);
  });
});