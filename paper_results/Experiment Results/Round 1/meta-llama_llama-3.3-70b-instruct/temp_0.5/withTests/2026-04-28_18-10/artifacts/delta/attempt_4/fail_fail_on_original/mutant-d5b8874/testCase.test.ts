import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('should correctly compose a Delta with a retain and an insert when the retain has an object value and the insert has a string value', () => {
    const delta1 = new Delta().retain({ embed: 1 });
    const delta2 = new Delta().insert('test', { bold: true });
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([
      { insert: 'test', attributes: { bold: true } },
    ]);

    const delta3 = new Delta().retain({ embed: 1 }, { italic: true });
    const delta4 = new Delta().insert('test', { bold: true });
    const composedDelta2 = delta3.compose(delta4);
    expect(composedDelta2.ops).toEqual([
      { insert: 'test', attributes: { bold: true, italic: true } },
    ]);
  });
});