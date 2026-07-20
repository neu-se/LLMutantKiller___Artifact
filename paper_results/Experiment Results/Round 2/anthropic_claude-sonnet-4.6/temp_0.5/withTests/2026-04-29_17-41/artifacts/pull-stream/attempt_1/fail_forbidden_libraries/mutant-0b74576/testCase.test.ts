import { describe, it, expect } from '@jest/globals';
import tester from '../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js';

describe('tester', () => {
  it('should use identity function when test is falsy, returning the data unchanged', () => {
    // When tester is called with null, prop(null) returns falsy, so it falls back to id
    // The identity function should return the element itself
    const fn = tester(null);
    const value = { key: 'someValue' };
    expect(fn(value)).toBe(value);
  });
});