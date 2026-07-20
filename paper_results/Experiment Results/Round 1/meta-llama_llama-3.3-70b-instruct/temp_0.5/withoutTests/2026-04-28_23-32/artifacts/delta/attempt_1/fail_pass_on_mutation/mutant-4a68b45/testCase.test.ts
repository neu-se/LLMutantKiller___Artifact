import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('Op', () => {
  it('should calculate the length of an operation correctly', () => {
    const op1: Op = { retain: { foo: 'bar' } };
    const op2: Op = { retain: null };

    expect(Op.length(op1)).toBe(1);
    expect(Op.length(op2)).toBe(1);

    const op3: Op = { retain: 5 };
    expect(Op.length(op3)).toBe(5);

    const op4: Op = { delete: 10 };
    expect(Op.length(op4)).toBe(10);

    const op5: Op = { insert: 'hello' };
    expect(Op.length(op5)).toBe(5);

    const op6: Op = { insert: { foo: 'bar' } };
    expect(Op.length(op6)).toBe(1);
  });
});