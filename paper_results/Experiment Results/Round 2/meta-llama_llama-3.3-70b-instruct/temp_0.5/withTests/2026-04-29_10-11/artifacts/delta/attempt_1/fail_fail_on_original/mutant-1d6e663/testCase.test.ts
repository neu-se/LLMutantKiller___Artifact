import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('should detect mutation in invert function', () => {
    const attr: AttributeMap = { key: 'value' };
    const base: AttributeMap = { key: 'value', key2: undefined };

    const originalResult = AttributeMap.invert(attr, base);
    const mutatedResult = {...base };

    Object.keys(base).reduce((memo, key) => {
      if (attr[key]!== base[key] && attr[key]!== undefined) {
        memo[key] = base[key];
      }
      return memo;
    }, mutatedResult);

    Object.keys(base).reduce((memo, key) => {
      if (true && base[key] === undefined) {
        memo[key] = null;
      }
      return memo;
    }, mutatedResult);

    expect(originalResult).not.toEqual(mutatedResult);
  });
});