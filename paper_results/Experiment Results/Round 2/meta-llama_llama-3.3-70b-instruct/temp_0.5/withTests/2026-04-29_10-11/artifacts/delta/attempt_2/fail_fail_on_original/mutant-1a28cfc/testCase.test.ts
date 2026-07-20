import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose function', () => {
  it('should throw an error when composing an embed with a non-object', () => {
    const a = new Delta().insert({ embed: 'test' });
    const b = new Delta().retain('test');
    expect(() => a.compose(b)).toThrowError('cannot retain a string');
  });
});