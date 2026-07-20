import { test, expect } from '@jest/globals';
import { tester } from '../../../../../../../../subject_repositories/pull-stream/util/tester.js';

test('tester function', () => {
  const testFunction = (data: any) => data;
  const testerFunction = tester(testFunction);
  const data = 'test data';
  const result = testerFunction(data);
  expect(result).toBe(data);

  const idFunction = (e: any) => e;
  const mutatedTesterFunction = tester({ test: testFunction });
  const mutatedResult = mutatedTesterFunction(data);
  expect(mutatedResult).toBe(data);

  const mutatedIdFunction = (e: any) => {};
  const mutatedTesterFunction2 = tester(mutatedIdFunction);
  const mutatedResult2 = mutatedTesterFunction2(data);
  expect(mutatedResult2).not.toBe(data);
});