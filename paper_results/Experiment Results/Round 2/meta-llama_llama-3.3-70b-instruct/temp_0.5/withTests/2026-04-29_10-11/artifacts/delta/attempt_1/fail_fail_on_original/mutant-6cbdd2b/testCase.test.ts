import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose correctly when firstOther.retain is a number', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    const expected = new Delta().insert('B').insert('A');
    expect(a.compose(b)).toEqual(expected);
  });

  it('should throw an error when firstOther.retain is not a number and firstOther.attributes is null', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain({ embed: 1 });
    expect(() => a.compose(b)).toThrowError('no handlers for embed type "embed"');
  });
});