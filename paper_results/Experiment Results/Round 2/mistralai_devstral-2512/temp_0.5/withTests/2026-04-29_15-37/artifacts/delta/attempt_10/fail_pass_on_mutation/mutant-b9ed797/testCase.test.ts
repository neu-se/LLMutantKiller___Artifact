import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push()', () => {
  it('should append operation when no merge occurs', () => {
    const delta = new Delta().insert('a');
    delta.push({ retain: 1 });
    expect(delta.ops).toEqual([
      { insert: 'a' },
      { retain: 1 }
    ]);
  });
});