import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose optimization', () => {
  it('should correctly handle the optimization condition when composing deltas', () => {
    const delta1 = new Delta().insert('test');
    const delta2 = new Delta().retain(4).insert('!');
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: 'test' }, { insert: '!' }]);
  });
});