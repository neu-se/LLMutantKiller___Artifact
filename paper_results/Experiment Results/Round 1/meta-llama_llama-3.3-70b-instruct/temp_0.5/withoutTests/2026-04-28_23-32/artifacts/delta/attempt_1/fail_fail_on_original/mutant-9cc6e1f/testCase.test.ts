import Delta from '../../../src/Delta';

describe('Delta transform function', () => {
  it('should not transform embed types when they do not match', () => {
    const delta1 = new Delta().insert({ a: 'value1' });
    const delta2 = new Delta().insert({ b: 'value2' });
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops[0].insert).toEqual({ a: 'value1' });
  });
});