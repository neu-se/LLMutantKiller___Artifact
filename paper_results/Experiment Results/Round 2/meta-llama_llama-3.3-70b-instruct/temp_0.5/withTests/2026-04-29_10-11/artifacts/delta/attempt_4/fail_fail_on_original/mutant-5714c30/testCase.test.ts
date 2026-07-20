// testCase.test.ts
import Delta from '../../../Delta';

describe('transform', () => {
  it('should return correct result when thisData is an object and otherData is an object', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => Object.assign({}, a, b),
      transform: (a, b) => Object.assign({}, a, b),
      invert: (a, b) => Object.assign({}, a, b),
    });
    const delta1 = new Delta().retain({ test: 'data1' });
    const delta2 = new Delta().retain({ test: 'data2' });
    const result = delta1.transform(delta2);
    expect(result.ops[0].retain).toEqual({ test: 'data1' });
  });
});