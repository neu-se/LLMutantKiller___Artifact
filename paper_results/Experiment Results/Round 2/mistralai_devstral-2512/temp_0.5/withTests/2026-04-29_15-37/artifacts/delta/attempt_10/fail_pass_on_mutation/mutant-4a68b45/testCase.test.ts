import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op.length()', () => {
  it('should return 1 for retain with object value', () => {
    const op = { retain: { test: true } };
    expect(Op.length(op)).toEqual(1);
  });
});