import { tester } from '../../../util/tester';

describe('tester function', () => {
  it('should pass on the original code and fail on the mutated code', () => {
    const idFunction = (e: any) => e;
    const testFunction = tester(idFunction);
    const data = 'test data';
    const result = testFunction(data);
    if (result !== data) {
      throw new Error('Test failed');
    }
  });
});