import * as AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('compose function', () => {
    const a = { bold: true, color: 'red' };
    const b = { italic: true };
    const result = AttributeMap.compose(a, b);
    expect(result).toBeDefined();
  });
});