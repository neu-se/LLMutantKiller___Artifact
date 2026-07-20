import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should compose correctly', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    const c = new Delta().retain(2);
    const expected = new Delta().insert('AB');
    expect(a.compose(b).compose(c)).toEqual(expected);
  });
});