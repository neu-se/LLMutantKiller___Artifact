import { describe, it, expect } from '@jest/globals';
import tester from '../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js';

describe('tester', () => {
  it('should return the identity function when called with a falsy test, which returns its input unchanged', () => {
    const identityFn = tester(null);
    const input = { key: 'value' };
    const result = identityFn(input);
    expect(result).toBe(input);
  });
});