import { Op } from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Op.length()', () => {
  it('returns 1 for retain with object value', () => {
    const op: Op = { retain: { figure: true } };
    expect(Op.length(op)).toEqual(1);
  });
});