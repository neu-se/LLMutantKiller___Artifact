import Op from "../src/Op";

describe('Op.length', () => {
  it('returns string insert length when retain is null (not a valid object retain)', () => {
    // When retain is null, typeof null === 'object' but null is not a valid object retain.
    // Original: null fails the !== null check, falls through to insert branch → returns 'hello'.length = 5
    // Mutated: null passes the (typeof === 'object' && true) check, returns 1
    const op = { insert: 'hello', retain: null } as any;
    expect(Op.length(op)).toEqual(5);
  });
});