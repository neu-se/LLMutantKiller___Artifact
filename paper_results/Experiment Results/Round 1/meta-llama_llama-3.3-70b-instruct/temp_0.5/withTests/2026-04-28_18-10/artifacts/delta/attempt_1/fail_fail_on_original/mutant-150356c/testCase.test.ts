import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should compose correctly when thisIter.peekType() === \'insert\'', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    const expected = new Delta().insert('B').insert('A');
    expect(a.compose(b)).toEqual(expected);
  });

  it('should throw an error when thisIter.peekType() is not \'insert\'', () => {
    const a = new Delta().retain(1);
    const b = new Delta().retain(1).insert('B');
    expect(() => a.compose(b)).toThrowError('no handlers for embed type "undefined"');
  });
});