import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('rejects paths without leading slashes with a meaningful error message', () => {
    const spec = 'foo';
    try {
      new Matcher(spec);
      throw new Error(`Expected path spec '${spec}' to be rejected`);
    } catch (error) {
      strictEqual(error.message, 'Path must begin with a slash');
    }
  });
});