import { Delta } from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('transform should handle null otherData correctly', () => {
    const delta1 = new Delta([{ retain: { foo: 'bar' } }]);
    const delta2 = new Delta([{ retain: null }]);
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops[0].retain).not.toBeNull();
  });
});