import * as AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('transform function', () => {
    const a = { bold: true, color: 'red', font: null };
    const b = { color: 'blue', font: 'serif', italic: true };
    const result = AttributeMap.transform(a, b, true);
    expect(Object.keys(result).length).toBeGreaterThan(0);
  });
});