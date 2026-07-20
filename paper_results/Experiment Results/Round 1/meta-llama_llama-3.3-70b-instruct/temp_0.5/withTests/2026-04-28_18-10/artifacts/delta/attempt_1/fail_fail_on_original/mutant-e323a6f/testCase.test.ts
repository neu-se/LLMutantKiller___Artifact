import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts';

describe('AttributeMap', () => {
  it('transform() should return undefined when attributes is empty', () => {
    const a: any = {};
    const b: any = {};
    const priority = true;
    const result = AttributeMap.transform(a, b, priority);
    expect(result).toBeUndefined();
  });

  it('transform() should return attributes when attributes is not empty', () => {
    const a: any = { key: 'value' };
    const b: any = {};
    const priority = true;
    const result = AttributeMap.transform(a, b, priority);
    expect(result).toEqual(a);
  });
});