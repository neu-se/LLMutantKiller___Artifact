import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('Op', () => {
  it('should return the correct length for an op with a retain object and null', () => {
    const op: Op = {
      retain: { a: null },
    };
    expect(Op.length(op)).not.toBe(1);
  });
});