import { Op } from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Op.length', () => {
  it('returns 1 for object retain even when insert is also present', () => {
    // In mutated code, object retain falls through to else branch
    // which checks op.insert - if insert is a string, it returns insert.length instead of 1
    const op = { retain: { figure: true }, insert: 'hello' } as Op;
    expect(Op.length(op)).toEqual(1);
  });
});