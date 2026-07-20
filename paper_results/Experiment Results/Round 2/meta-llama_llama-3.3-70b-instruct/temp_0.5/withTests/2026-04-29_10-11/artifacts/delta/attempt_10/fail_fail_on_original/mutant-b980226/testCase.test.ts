import * as AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('compose function', () => {
    const a: { [key: string]: any } = { bold: true, color: 'red' };
    const b: { [key: string]: any } = { italic: true };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ bold: true, color: 'red', italic: true });
  });
});