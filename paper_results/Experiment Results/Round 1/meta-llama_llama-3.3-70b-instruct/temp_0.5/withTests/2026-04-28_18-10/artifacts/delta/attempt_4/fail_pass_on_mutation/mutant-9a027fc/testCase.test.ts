import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform()', () => {
  it('should transform correctly when otherData is an object and not null', () => {
    const a = new Delta().retain(1, { color: 'blue' });
    const b = new Delta().retain(1, { bold: true, color: 'red' });
    const expected = new Delta().retain(1, { bold: true });
    expect(a.transform(b, true)).toEqual(expected);
  });

  it.skip('should fail when thisData and otherData are objects with different keys', () => {
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain({ image: 'http://quilljs.com' });
    expect(() => a.transform(b, true)).toThrowError();
  });
});