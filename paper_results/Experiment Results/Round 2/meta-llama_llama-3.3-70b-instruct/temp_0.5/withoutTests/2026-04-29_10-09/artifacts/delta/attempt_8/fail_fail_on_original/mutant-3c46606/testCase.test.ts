import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should transform embeds correctly', () => {
    const delta1 = new Delta();
    delta1.insert('text1');
    const delta2 = new Delta();
    delta2.insert('text2');
    const transformedDelta = delta1.transform(delta2, true);
    expect(transformedDelta.ops[0].insert).toEqual('text2');
  });
});