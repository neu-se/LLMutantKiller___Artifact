import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op.length()', () => {
  it('should return 1 for retain object with array value', () => {
    const op = { retain: [] };
    expect(Op.length(op)).toEqual(1);
  });
});