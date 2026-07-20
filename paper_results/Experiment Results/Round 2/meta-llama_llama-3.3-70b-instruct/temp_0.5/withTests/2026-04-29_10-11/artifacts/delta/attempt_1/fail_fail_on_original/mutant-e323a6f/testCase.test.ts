import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('transform function with priority', () => {
    const a: AttributeMap = { bold: true, color: 'red', font: null };
    const b: AttributeMap = { color: 'blue', font: 'serif', italic: true };
    const result = AttributeMap.transform(a, b, true);
    expect(result).toEqual({ italic: true });
  });

  it('transform function without priority', () => {
    const a: AttributeMap = { bold: true, color: 'red', font: null };
    const b: AttributeMap = { color: 'blue', font: 'serif', italic: true };
    const result = AttributeMap.transform(a, b, false);
    expect(result).toEqual(b);
  });

  it('transform function with empty objects', () => {
    const a: AttributeMap = { bold: true, color: 'red', font: null };
    const b: AttributeMap = {};
    const result = AttributeMap.transform(a, b, true);
    expect(result).toEqual({});
  });

  it('transform function with null values', () => {
    const a: AttributeMap = { bold: true, color: 'red', font: null };
    const b: AttributeMap = { color: null, font: null };
    const result = AttributeMap.transform(a, b, true);
    expect(result).toEqual({ color: null, font: null });
  });

  it('transform function with falsey values', () => {
    const a: AttributeMap = { bold: true, color: 'red', font: null };
    const b: AttributeMap = { bold: false, color: '', font: 0 };
    const result = AttributeMap.transform(a, b, true);
    expect(result).toEqual({ bold: false, color: '', font: 0 });
  });
});