import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op', () => {
  it('should return the correct length for an op with a retain string', () => {
    const op: Op = {
      retain: "test",
    };

    expect(Op.length(op)).toBe(1);
  });
});