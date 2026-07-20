import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op.length()', () => {
  it('should return 1 for retain object with number value', () => {
    const op = { retain: 5 };
    expect(Op.length(op)).toEqual(5);
  });
});