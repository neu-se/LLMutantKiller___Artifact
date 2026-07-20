import { transform } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap transform function', () => {
  it('should return undefined when the resulting attribute map is empty', () => {
    const a: { [key: string]: unknown } = {};
    const b: { [key: string]: unknown } = {};
    const result = transform(a, b, true);
    expect(result).toBeUndefined();
  });
});