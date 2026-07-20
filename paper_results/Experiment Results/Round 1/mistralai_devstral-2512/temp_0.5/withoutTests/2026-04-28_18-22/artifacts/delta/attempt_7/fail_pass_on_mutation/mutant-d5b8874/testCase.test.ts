import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose with retain object', () => {
  it('should correctly handle retain object with null attributes in compose', () => {
    const delta1 = new Delta().retain({ type: 'embed', data: 'test' }, { bold: true });
    const delta2 = new Delta().delete(1);
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ delete: 1 }]);
  });
});