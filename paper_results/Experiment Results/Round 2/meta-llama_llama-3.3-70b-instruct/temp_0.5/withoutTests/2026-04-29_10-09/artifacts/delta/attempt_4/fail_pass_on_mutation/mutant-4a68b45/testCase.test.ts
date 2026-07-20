import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('Op', () => {
  it('should return the correct length for an op with a retain object', () => {
    const op: Op = {
      retain: { foo: 'bar' },
      attributes: {}
    };
    expect(Op.length(op)).toBe(1);
  });
});