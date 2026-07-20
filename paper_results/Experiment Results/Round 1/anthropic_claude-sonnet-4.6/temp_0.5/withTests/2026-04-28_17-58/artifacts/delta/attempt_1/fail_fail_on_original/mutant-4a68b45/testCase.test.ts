import { Op } from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Op.length', () => {
  it('returns insert string length when retain is null', () => {
    // When retain is null and insert is a string, the original code falls through
    // to the insert branch (because null !== null is false), returning the string length.
    // The mutated code incorrectly matches the object-retain branch (removing the null check)
    // and returns 1 instead.
    const op: Op = { retain: null as unknown as number, insert: 'hello' };
    expect(Op.length(op)).toEqual(5);
  });
});