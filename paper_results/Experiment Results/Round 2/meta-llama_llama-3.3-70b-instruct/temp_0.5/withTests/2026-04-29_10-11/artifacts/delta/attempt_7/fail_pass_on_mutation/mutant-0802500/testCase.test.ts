import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with insert and retain at the start with firstOther.retain', () => {
    const a = new Delta().insert('Hello');
    const b = new Delta().retain(5).insert(' World');
    const expected = new Delta().insert('Hello World');
    expect(a.compose(b)).toEqual(expected);
  });
});