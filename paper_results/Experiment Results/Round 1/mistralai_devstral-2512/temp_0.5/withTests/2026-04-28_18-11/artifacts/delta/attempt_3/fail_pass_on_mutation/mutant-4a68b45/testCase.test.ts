import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op.length()', () => {
  it('should return 1 for retain with object value when op.retain is not null', () => {
    const op = { retain: { key: 'value' } };
    expect(Op.length(op)).toEqual(1);
  });
});