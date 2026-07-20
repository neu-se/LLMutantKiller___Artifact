import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('Op.length', () => {
  it('should return 1 for retain object with non-null value', () => {
    const op = {
      retain: { some: 'value' }
    };
    expect(Op.length(op)).toBe(1);
  });
});