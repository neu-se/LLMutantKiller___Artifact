import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op.length()', () => {
  it('should return 1 for retain with object value that is not null', () => {
    const op = { retain: { test: 123 } };
    expect(Op.length(op)).toEqual(1);
  });
});