import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when composing two embeds with different types', () => {
    const delta1 = new Delta().insert({ embed: 1 });
    const delta2 = new Delta().retain({ otherembed: 2 });
    expect(() => delta1.compose(delta2)).toThrowError('embed types not matched: embed != otherembed');
  });
});