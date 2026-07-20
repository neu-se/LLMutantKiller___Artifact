import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op.length()', () => {
  it('should return 1 for retain object with number 0', () => {
    const op = { retain: 0 };
    expect(Op.length(op)).toEqual(0);
  });
});