import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('compose insert with delete where other has plain retain at start', () => {
    // Test the specific optimization path in compose
    // where other starts with a plain retain
    const a = new Delta().insert('Hello').delete(3);
    const b = new Delta().retain(5);
    const expected = new Delta().insert('Hello').delete(3);
    expect(a.compose(b)).toEqual(expected);
  });
});