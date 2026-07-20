import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose function', () => {
  it('should pass when composing two embeds in the original code and fail in the mutated code', () => {
    const a = new Delta().insert({ embed: 'test' });
    const b = new Delta().retain({ embed: 'test' });
    expect(() => a.compose(b)).not.toThrowError();
  });

  it('should fail when composing an embed with a non-object in the original code and pass in the mutated code', () => {
    const a = new Delta().insert({ embed: 'test' });
    const b = new Delta().retain('test');
    expect(() => a.compose(b)).toThrowError();
  });
});