import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('should correctly compose a Delta with a delete and an insert when the delete is before the insert', () => {
    const delta1 = new Delta().delete(1);
    const delta2 = new Delta().insert('test');
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([
      { insert: 'test' },
      { delete: 1 },
    ]);

    const delta3 = new Delta().delete(1);
    const delta4 = new Delta().insert({ embed: 1 });
    const composedDelta2 = delta3.compose(delta4);
    expect(composedDelta2.ops).toEqual([
      { insert: { embed: 1 } },
      { delete: 1 },
    ]);
  });
});