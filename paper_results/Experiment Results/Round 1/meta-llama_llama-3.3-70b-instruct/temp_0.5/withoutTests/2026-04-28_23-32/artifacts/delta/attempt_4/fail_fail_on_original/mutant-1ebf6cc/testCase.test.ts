import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op', () => {
  it('should throw an error when typeof op.retain is ""', () => {
    const op: Op = {
      retain: "",
    };

    expect(() => Op.length(op)).toThrow();
  });
});