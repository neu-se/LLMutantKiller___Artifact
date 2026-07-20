import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('transform with priority should return the correct result', () => {
    const a = { bold: true, color: 'red' };
    const b = { color: 'blue', italic: true };
    const priority = true;
    const result = AttributeMap.transform(a, b, priority);
    expect(result).toEqual({ italic: true });
  });

  it('transform without priority should return the correct result', () => {
    const a = { bold: true, color: 'red' };
    const b = { color: 'blue', italic: true };
    const priority = false;
    const result = AttributeMap.transform(a, b, priority);
    expect(result).toEqual(b);
  });
});