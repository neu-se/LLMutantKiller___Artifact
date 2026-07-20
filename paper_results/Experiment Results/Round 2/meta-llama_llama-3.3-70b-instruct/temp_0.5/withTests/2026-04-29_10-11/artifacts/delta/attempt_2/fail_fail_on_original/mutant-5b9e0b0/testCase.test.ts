import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle retain with embed correctly when thisOp.retain is null', () => {
    const delta1 = new Delta().insert({ embed: 1 });
    const delta2 = new Delta().retain({ embed: 1 });
    const expected = new Delta().insert({ embed: 1 });
    expect(() => delta1.compose(delta2)).toThrowError(
      'embed types not matched: embed != embed',
    );
  });
});