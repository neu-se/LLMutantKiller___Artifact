import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('transform with priority', () => {
    const left = { bold: true, color: 'red', font: null };
    const right = { color: 'blue', font: 'serif', italic: true };
    const result = AttributeMap.transform(left, right, true);
    expect(result).toEqual({ italic: true });
  });

  it('transform without priority', () => {
    const left = { bold: true, color: 'red', font: null };
    const right = { color: 'blue', font: 'serif', italic: true };
    const result = AttributeMap.transform(left, right, false);
    expect(result).toEqual(right);
  });
});