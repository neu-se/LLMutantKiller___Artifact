import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('Op', () => {
  it('should calculate the length of an operation correctly', () => {
    const op: Op = { retain: null };
    expect(Op.length(op)).toBe(1);
  });
});