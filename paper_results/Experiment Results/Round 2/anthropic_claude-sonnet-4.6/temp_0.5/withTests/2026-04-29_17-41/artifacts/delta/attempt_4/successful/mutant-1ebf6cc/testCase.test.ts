import { Op } from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Op.length() with object retain', () => {
  it('returns 1 for retain object op, not falling through to insert logic', () => {
    // When retain is an object, Op.length should return 1 via the object retain branch
    // In the mutated code, it falls to the else branch which checks op.insert
    // If op.insert is also set (unusual but testable directly), behavior differs
    const op = { retain: { embed: 1 }, insert: 'hello' } as Op;
    // Original: hits object retain branch → returns 1
    // Mutated: hits else branch → returns 'hello'.length = 5
    expect(Op.length(op)).toEqual(1);
  });
});