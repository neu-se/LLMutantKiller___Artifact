import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op', () => {
  it('should calculate the length of an operation correctly', () => {
    const op: Op = { retain: {} };
    expect(Op.length(op)).toBe(1); // This should pass on the original code and fail on the mutated code
  });
});