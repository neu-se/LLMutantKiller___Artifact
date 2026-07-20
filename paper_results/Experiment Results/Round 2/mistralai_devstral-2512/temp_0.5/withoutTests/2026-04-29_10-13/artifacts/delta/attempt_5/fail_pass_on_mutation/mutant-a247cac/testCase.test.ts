import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose optimization', () => {
  it('should trigger the optimization path when composing with matching operations', () => {
    const delta1 = new Delta().insert('hello');
    const delta2 = new Delta().retain(5);
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: 'hello' }]);
  });
});