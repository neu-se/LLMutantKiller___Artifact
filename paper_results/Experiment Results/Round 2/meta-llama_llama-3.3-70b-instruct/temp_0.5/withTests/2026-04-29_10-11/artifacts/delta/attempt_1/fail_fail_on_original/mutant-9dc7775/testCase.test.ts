import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('transform', () => {
  it('should correctly transform a delta with an embed', () => {
    const a = new Delta().insert({ embed: 'test' });
    const b = new Delta().retain(1, { bold: true });
    const expected = new Delta().retain({ embed: 'test' }, { bold: true });
    expect(a.transform(b)).toEqual(expected);
  });
});