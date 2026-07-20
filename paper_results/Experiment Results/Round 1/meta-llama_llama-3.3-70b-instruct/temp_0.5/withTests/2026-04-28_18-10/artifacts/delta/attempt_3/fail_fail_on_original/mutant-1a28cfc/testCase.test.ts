import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose function', () => {
  it('should throw an error when composing a Delta with an embed and a Delta with a non-object embed', () => {
    const delta1 = new Delta().retain({ embed: 'test' });
    const delta2 = new Delta().retain({ embed: 'string' });
    const result = delta1.compose(delta2);
    const expected = new Delta().retain({ embed: 'string' });
    expect(result).toEqual(expected);
  });
});