import { AttributeMap } from '../../../../../src/AttributeMap';

describe('AttributeMap', () => {
  it('compose function should handle non-object inputs correctly', () => {
    const a: AttributeMap = { bold: true };
    const b = 'not an object';
    expect(() => AttributeMap.compose(a, b)).toThrow();
  });
});