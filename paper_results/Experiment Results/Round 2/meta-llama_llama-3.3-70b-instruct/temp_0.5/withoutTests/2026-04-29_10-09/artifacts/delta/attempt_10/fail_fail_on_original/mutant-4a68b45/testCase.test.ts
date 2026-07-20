import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('Op', () => {
  it('should return the correct length for an op with a retain object', () => {
    const op: Op = {
      retain: null,
    };
    expect(Op.length(op)).toBe(1);
    const op2: Op = {
      retain: {},
    };
    expect(Op.length(op2)).not.toBe(Op.length(op));
  });
});