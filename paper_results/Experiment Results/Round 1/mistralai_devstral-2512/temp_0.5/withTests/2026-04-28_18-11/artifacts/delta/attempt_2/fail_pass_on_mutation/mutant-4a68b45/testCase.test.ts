import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op.length()', () => {
  it('should handle retain with object value correctly', () => {
    const op = { retain: { custom: true } };
    expect(Op.length(op)).toEqual(1);
  });
});