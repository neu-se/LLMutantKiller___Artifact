import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op.length', () => {
  it('returns string insert length when retain is null', () => {
    // typeof null === 'object' in JavaScript, so:
    // Original: null fails the (op.retain !== null) check, falls through to insert branch → returns 'hello'.length = 5
    // Mutated: null passes the (typeof === 'object' && true) check, returns 1
    const op: any = { insert: 'hello', retain: null };
    expect(Op.length(op)).toEqual(5);
  });
});