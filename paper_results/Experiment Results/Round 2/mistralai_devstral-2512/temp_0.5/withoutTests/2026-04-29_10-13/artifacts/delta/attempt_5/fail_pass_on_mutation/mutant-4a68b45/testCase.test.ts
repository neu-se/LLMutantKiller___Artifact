import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('Op.length', () => {
  it('should correctly handle retain object with null value', () => {
    const op = {
      retain: null
    };
    expect(Op.length(op)).toBe(1);
  });
});