import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op', () => {
  it('should calculate the length of an operation correctly', () => {
    const op: Op = { retain: null };
    expect(Op.length(op)).toBe(1);
    const op2: Op = { retain: {} };
    expect(Op.length(op2)).toBe(1);
  });
});