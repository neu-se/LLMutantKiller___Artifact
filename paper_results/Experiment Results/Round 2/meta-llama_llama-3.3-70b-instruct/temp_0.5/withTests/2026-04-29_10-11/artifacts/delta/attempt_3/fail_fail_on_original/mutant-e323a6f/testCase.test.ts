import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('transform function should not return an object with length greater than 0 when attributes is empty', () => {
    const a: AttributeMap = {};
    const b: AttributeMap = { color: 'blue', font: 'serif', italic: true };
    const result = AttributeMap.transform(a, b, false);
    expect(Object.keys(result).length).toBe(3);
  });
});