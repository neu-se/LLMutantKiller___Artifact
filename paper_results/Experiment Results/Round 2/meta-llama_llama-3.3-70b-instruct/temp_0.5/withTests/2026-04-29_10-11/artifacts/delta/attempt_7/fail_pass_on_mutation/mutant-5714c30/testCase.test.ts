// testCase.test.ts
import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should return correct result when thisData is an object and otherData is an object', () => {
    Delta.registerEmbed('test', {
      compose: (a: any, b: any) => Object.assign({}, a, b),
      transform: (a: any, b: any) => Object.assign({}, a, b),
      invert: (a: any, b: any) => Object.assign({}, a, b),
    });
    const delta1 = new Delta().retain({ test: 'data1' });
    const delta2 = new Delta().retain({ test: 'data2' });
    const result = delta1.transform(delta2);
    expect(result.ops[0].retain).toEqual({ test: { 0: 'd', 1: 'a', 2: 't', 3: 'a', 4: '2' } });
  });
});