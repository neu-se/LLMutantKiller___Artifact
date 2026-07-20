import { Matcher } from '../../../src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('matcher', () => {
  it('rejects paths with malformed wildcards', () => {
    const spec = '/+a';
    try {
      new Matcher(spec);
      strictEqual(true, false, `expected path spec '${spec}' to be rejected`);
    } catch (err: any) {
      strictEqual(err.message, 'Path contains malformed wildcards');
    }
  });
});