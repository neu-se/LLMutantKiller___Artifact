import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('should correctly compose a Delta with a retain and an insert when the retain has an object value', () => {
    const delta1 = new Delta().retain({ embed: 1 });
    const delta2 = new Delta().insert('test');
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([
      { insert: 'test' },
    ]);

    const delta3 = new Delta().retain({ embed: 1 });
    const delta4 = new Delta().insert({ embed: 2 });
    const composedDelta2 = delta3.compose(delta4);
    expect(composedDelta2.ops).toEqual([
      { insert: { embed: 2 } },
    ]);

    const delta5 = new Delta().retain({ embed: 1 });
    const delta6 = new Delta().insert({ embed: 1 });
    const composedDelta3 = delta5.compose(delta6);
    expect(composedDelta3.ops).toEqual([
      { insert: { embed: 1 } },
    ]);
  });
});