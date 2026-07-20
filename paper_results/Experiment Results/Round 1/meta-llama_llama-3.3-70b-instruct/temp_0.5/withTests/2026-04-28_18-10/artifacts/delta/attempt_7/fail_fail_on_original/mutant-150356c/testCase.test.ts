import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should compose correctly', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
    const c = new Delta().retain(2);
    expect(() => a.compose(c)).toThrowError('no handlers for embed type "undefined"');
  });
});