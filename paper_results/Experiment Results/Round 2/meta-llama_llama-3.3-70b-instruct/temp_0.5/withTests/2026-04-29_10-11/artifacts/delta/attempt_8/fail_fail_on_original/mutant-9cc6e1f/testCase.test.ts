import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should handle embeds with different keys', () => {
    const a = new Delta().insert({ embed: { foo: 'bar' } });
    const b = new Delta().retain({ embed2: { foo: 'baz' } });
    expect(() => a.transform(b)).toThrowError('embed types not matched: embed != embed2');
  });
});