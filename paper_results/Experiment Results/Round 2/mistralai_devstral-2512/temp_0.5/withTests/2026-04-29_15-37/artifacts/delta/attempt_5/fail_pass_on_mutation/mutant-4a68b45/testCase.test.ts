import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op.length()', () => {
  it('should return 1 for retain object with false boolean value', () => {
    const op = { retain: false };
    expect(Op.length(op)).toEqual(1);
  });
});