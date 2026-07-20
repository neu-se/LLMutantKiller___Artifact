import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts';

describe('AttributeMap', () => {
  it('diff() should correctly handle the case when b is not an object', () => {
    const a = { foo: 'bar' };
    const b = 'string';
    expect(() => AttributeMap.diff(a, b)).toThrow();
  });
});