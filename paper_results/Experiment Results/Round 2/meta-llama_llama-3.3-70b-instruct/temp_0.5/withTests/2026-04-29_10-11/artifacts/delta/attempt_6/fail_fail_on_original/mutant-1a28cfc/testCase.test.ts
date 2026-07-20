import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose function', () => {
  it('should throw an error when composing an embed with a non-object in the original code', () => {
    const a = new Delta().insert({ embed: 'test' });
    const b = new Delta().retain('test');
    expect(() => a.compose(b)).toThrowError();
  });

  it('should not throw an error when composing an embed with an object in the original code', () => {
    const a = new Delta().insert({ embed: 'test' });
    const b = new Delta().retain({ embed: 'test' });
    expect(() => a.compose(b)).not.toThrowError();
  });
});