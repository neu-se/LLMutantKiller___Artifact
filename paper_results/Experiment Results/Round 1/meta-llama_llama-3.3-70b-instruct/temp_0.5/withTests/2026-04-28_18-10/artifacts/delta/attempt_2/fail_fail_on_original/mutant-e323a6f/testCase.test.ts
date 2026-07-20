import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('transform() should return an empty object when attributes is empty', () => {
    const a = {};
    const b = {};
    const priority = false;
    const result = AttributeMap.transform(a, b, priority);
    expect(result).toEqual({});
  });

  it('transform() should return attributes when attributes is not empty', () => {
    const a = { key: 'value' };
    const b = {};
    const priority = false;
    const result = AttributeMap.transform(a, b, priority);
    expect(result).toEqual({});
  });
});