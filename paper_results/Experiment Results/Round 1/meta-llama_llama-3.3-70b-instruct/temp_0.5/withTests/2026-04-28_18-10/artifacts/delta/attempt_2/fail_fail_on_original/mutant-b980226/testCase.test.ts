import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('transform should return attributes when priority is true', () => {
    const a: AttributeMap = { bold: true, color: 'red' };
    const b: AttributeMap = { color: 'blue', italic: true };
    const priority = true;
    const result = AttributeMap.transform(a, b, priority);
    expect(Object.keys(result).length).toBeGreaterThan(0);
  });
});