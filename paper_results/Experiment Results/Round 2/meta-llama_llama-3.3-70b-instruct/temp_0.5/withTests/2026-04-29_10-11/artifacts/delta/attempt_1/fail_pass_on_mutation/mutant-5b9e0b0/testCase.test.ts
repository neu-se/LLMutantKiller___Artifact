import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it.skip('should handle retain with embed correctly', () => {
    const delta1 = new Delta().insert({ embed: 1 });
    const delta2 = new Delta().retain({ embed: 1 });
    const expected = new Delta().insert({ embed: 1 });
    expect(delta1.compose(delta2)).toEqual(expected);
  });

  it('should throw an error when embed types do not match', () => {
    const delta1 = new Delta().insert({ embed: 1 });
    const delta2 = new Delta().retain({ other: 1 });
    expect(() => delta1.compose(delta2)).toThrowError(
      'embed types not matched: embed != other',
    );
  });
});