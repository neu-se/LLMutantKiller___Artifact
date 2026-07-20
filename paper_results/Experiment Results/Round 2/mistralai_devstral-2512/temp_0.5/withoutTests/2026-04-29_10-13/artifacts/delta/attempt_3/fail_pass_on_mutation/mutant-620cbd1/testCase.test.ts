import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose with empty retain', () => {
  it('should skip empty retain operation at start', () => {
    const delta1 = new Delta().insert('test');
    const delta2 = new Delta().retain(0, { color: 'red' });
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: 'test' }]);
  });
});