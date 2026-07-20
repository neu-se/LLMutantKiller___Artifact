import Delta from "../../../../../../../../../src/Delta";

describe('compose()', () => {
  it('should compose a non-empty delta with an empty delta without throwing', () => {
    const a = new Delta().insert('Hello');
    const b = new Delta();
    const expected = new Delta().insert('Hello');
    expect(a.compose(b)).toEqual(expected);
  });
});