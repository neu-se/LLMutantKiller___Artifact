import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('Op', () => {
  it('should calculate the length of an operation correctly', () => {
    const op: Op = { retain: {} };
    expect(Op.length(op)).not.toBe(1); // This should fail on the mutated code
  });
});