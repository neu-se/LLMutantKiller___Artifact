import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op', () => {
  it('should calculate the length of an operation correctly', () => {
    const op: Op = { retain: {} };
    expect(Op.length(op)).toBe(1);
    const op2: Op = { retain: null };
    expect(Op.length(op2)).toBe(1);
    expect(Op.length(op)).toBe(Op.length(op2));
    const op3: Op = { retain: 5 };
    expect(Op.length(op3)).toBe(5);
    expect(Op.length(op3)).not.toBe(Op.length(op));
  });
});