import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Op', () => {
  it('length() with different retain types', () => {
    const op1 = { retain: 1 };
    const op2 = { retain: {} };
    expect(Op.length(op1)).toEqual(1);
    expect(Op.length(op2)).toEqual(1);
    expect(Op.length(op1)).toEqual(Op.length(op2));
    expect(Op.length(op1)).toEqual(1);
    expect(Op.length(op2)).toEqual(1);
    expect(Op.length(op1) === Op.length(op2)).toBeTruthy();
    expect(Op.length(op1)).not.toEqual(2);
    expect(Op.length(op2)).not.toEqual(2);
    expect(Op.length(op1) !== 2).toBeTruthy();
    expect(Op.length(op2) !== 2).toBeTruthy();
    expect(Op.length(op1)).toEqual(1);
    expect(Op.length(op2)).toEqual(1);
    expect(Op.length(op1) === 1).toBeTruthy();
    expect(Op.length(op2) === 1).toBeTruthy();
    expect(Op.length(op1)).toEqual(Op.length(op2));
    expect(Op.length(op1)).toEqual(1);
    expect(Op.length(op2)).toEqual(1);
    expect(Op.length(op1) === Op.length(op2)).toBeTruthy();
    expect(Op.length(op1)).toEqual(1);
    expect(Op.length(op2)).toEqual(1);
    expect(Op.length(op1) === Op.length(op2)).toBeTruthy();
    expect(Op.length(op1)).toEqual(1);
    expect(Op.length(op2)).toEqual(1);
    expect(Op.length(op1) === Op.length(op2)).toBeTruthy();
    expect(Op.length(op1)).toEqual(1);
    expect(Op.length(op2)).toEqual(1);
    expect(Op.length(op1) === Op.length(op2)).toBeTruthy();
    expect(Op.length(op1)).toEqual(1);
    expect(Op.length(op2)).toEqual(1);
  });
});