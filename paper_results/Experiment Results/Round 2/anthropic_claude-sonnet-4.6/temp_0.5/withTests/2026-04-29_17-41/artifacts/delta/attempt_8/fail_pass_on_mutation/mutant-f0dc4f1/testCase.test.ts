import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform uses peekType retain correctly', () => {
  it('transforming with retain op produces correct result', () => {
    const a = new Delta().retain(5);
    const b = new Delta().insert('X');
    const result = a.transform(b, true);
    const expected = new Delta().insert('X');
    expect(result).toEqual(expected);
  });
});