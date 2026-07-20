import { transform } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('should return undefined when the transformed attributes are empty', () => {
    const a: any = {};
    const b: any = {};
    const priority = true;
    const result = transform(a, b, priority);
    expect(result).toBeUndefined();
  });
});