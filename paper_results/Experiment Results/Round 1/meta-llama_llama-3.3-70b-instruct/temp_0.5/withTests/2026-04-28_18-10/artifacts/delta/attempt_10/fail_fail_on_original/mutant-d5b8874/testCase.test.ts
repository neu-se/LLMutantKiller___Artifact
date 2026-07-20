import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('should correctly compose a Delta with a retain and an insert when the retain has an object value and is checked for null', () => {
    const delta1 = new Delta().retain({ embed: 1 });
    const delta2 = new Delta().insert('test');
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([
      { insert: 'test' },
      { retain: { embed: 1 } },
    ]);

    const delta3 = new Delta().retain(null);
    const delta4 = new Delta().insert('test');
    expect(() => delta3.compose(delta4)).toThrowError('cannot retain a null');
  });
});