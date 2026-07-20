import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose optimization', () => {
  it('should correctly handle the optimization condition with matching last operation', () => {
    const delta1 = new Delta().insert('test');
    const delta2 = new Delta().retain(4);
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: 'test' }]);
  });
});