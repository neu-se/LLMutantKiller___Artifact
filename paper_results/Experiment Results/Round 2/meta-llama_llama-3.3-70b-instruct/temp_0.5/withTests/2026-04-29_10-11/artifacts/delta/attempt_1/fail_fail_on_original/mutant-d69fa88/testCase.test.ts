import Delta from '../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when retain is called with an object and the embed type does not match', () => {
    const delta = new Delta();
    const op = { retain: { embed: 1 } };
    const base = new Delta().insert({ embed: 2 });
    expect(() => delta.invert(base)).toThrowError('embed types not matched: embed != embed');
  });
});