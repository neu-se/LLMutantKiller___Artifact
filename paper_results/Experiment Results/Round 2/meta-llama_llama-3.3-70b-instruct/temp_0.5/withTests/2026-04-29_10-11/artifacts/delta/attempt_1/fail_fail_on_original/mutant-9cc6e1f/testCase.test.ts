import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should throw an error when embed types do not match', () => {
    const a = new Delta().insert({ embed: 1 });
    const b = new Delta().retain({ other: 1 });
    expect(() => a.transform(b)).toThrowError('embed types not matched: embed != other');
  });
});