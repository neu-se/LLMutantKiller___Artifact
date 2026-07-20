import { test } from '@jest/globals';
import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  test('should throw an error when an object is passed as an argument', () => {
    const obj = {};
    expect(() => pull(obj)).toThrowError();
  });
});