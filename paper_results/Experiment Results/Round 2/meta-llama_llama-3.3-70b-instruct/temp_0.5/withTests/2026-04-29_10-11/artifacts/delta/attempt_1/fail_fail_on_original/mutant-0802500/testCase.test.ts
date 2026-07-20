import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with invalid embed type', () => {
    const a = new Delta().insert({ embed: 1 });
    const b = new Delta().retain({ embed: 2 });
    expect(() => a.compose(b)).toThrowError('embed types not matched: embed != embed');
  });
});