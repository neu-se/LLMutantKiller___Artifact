import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op.length()', () => {
  it('should return 1 for retain object with non-null object value', () => {
    const op = { retain: { key: 'value' } };
    expect(Op.length(op)).toEqual(1);
  });
});