import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should transform correctly when retain data is an object', () => {
    const delta1 = new Delta();
    delta1.retain({ test: 'data' }, {});
    const delta2 = new Delta();
    delta2.retain({ test: 'new data' }, {});
    const transformed = delta1.transform(delta2);
    expect(transformed.ops[0].retain).toEqual({ test: 'new data' });
  });
});