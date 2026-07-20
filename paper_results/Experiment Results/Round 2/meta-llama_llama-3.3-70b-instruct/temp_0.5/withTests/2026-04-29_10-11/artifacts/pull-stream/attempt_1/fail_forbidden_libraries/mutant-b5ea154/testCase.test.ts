import { test, expect } from '@jest/globals';
import { map } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js';

describe('map', () => {
  it('should throw an error when mapper is null or undefined', () => {
    expect(() => map(null)).toThrowError();
    expect(() => map(undefined)).toThrowError();
  });
});