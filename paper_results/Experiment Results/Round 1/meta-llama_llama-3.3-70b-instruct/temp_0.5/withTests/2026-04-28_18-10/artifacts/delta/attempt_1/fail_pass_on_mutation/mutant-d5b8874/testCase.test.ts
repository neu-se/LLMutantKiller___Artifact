import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it.skip('should correctly compose a Delta with a retain and an insert', () => {
    const delta1 = new Delta().retain({ embed: 1 });
    const delta2 = new Delta().insert('test');
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([
      { insert: 'test' },
    ]);
  });

  it('should correctly compose a Delta with a retain and a delete', () => {
    const delta1 = new Delta().retain({ embed: 1 });
    const delta2 = new Delta().delete(1);
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([
      { delete: 1 },
    ]);
  });

  it.skip('should correctly compose a Delta with a retain and another retain', () => {
    const delta1 = new Delta().retain({ embed: 1 });
    const delta2 = new Delta().retain(1);
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([
      { retain: 1 },
    ]);
  });
});