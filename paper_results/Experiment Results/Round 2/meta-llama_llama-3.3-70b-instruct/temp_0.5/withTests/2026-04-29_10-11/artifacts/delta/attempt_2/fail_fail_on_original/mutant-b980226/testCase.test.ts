import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('transform function', () => {
    const a: AttributeMap = { bold: true, color: 'red', font: null };
    const b: AttributeMap = { color: 'blue', font: 'serif', italic: true };
    const result = AttributeMap.transform(a, b, false);
    expect(result).toEqual(b);
  });
});