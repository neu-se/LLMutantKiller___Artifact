import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op.length()', () => {
  it('should return 1 for retain object with string value', () => {
    const op = { retain: "test" };
    expect(Op.length(op)).toEqual(1);
  });
});