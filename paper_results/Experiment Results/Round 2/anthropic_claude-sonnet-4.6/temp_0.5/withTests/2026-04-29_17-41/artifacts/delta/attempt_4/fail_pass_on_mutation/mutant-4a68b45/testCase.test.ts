import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op.length', () => {
  it('falls through to insert branch when retain property exists but is null', () => {
    // Create op with retain explicitly set to null
    // typeof null === 'object' is true in JS
    // Original: null !== null is false, so condition fails, falls to else, returns insert.length
    // Mutated: condition is true, returns 1
    const op = Object.assign({}, { insert: 'abcde' }, { retain: null }) as any;
    expect(Op.length(op)).toEqual(5);
  });
});