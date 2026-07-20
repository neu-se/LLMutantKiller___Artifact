import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('should correctly compose a Delta with a retain and a delete when the retain has an object value and null is checked', () => {
    const delta1 = new Delta().retain({ embed: 1 });
    const delta2 = new Delta().delete(1);
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([
      { delete: 1 },
    ]);

    const delta3 = new Delta().retain({ embed: 1 }, { italic: true });
    const delta4 = new Delta().delete(1);
    const composedDelta2 = delta3.compose(delta4);
    expect(composedDelta2.ops).toEqual([
      { delete: 1 },
    ]);
  });
});