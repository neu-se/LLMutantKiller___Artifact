import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should transform embeds correctly', () => {
    const a = new Delta().insert({ embed: { foo: 'bar' } });
    const b = new Delta().retain({ embed: { foo: 'bar' } });
    const expected = new Delta().retain(1).retain({ embed: { foo: 'bar' } });
    expect(a.transform(b)).toEqual(expected);
  });
});