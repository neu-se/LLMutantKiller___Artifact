import { Matcher } from '../../../src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('should throw an error when version is not provided', () => {
    const spec = '/';
    const version = undefined;
    let error: Error | undefined;
    try {
      Matcher.for(spec, version as any);
    } catch (err) {
      error = err;
    }
    strictEqual(error instanceof Error, true);
    strictEqual(error?.message, 'Path specification language version must be one of "1", "1.0", or "1.1"');
  });
});