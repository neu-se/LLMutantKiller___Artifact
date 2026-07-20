import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("Op", () => {
  it("should throw an error when retain is not a number or object", () => {
    const op: Op = {
      retain: null,
    };
    expect(() => Op.length(op)).toThrowError();
  });
});