import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op', () => {
  it('should calculate the length of an operation correctly', () => {
    const op: Op = { retain: {} };
    const op2: Op = { retain: null };
    expect(Op.length(op)).toBe(Op.length(op2));
    expect(Op.length(op)).toBe(1);
  });
});