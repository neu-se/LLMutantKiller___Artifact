import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with insert and retain at the start', () => {
    const a = new Delta().insert('Hello');
    const b = new Delta().retain(5);
    const expected = new Delta().insert('Hello');
    expect(a.compose(b)).toEqual(expected);
  });
});