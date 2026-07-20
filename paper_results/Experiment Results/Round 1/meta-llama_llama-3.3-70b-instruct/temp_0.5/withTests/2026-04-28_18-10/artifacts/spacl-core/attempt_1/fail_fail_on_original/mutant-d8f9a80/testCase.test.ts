import { Matcher } from '../../../src/matcher.ts';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('rejects paths without leading slashes', () => {
    const specs = [
      '+',
      '*/foo',
      'foo',
      'foo/+',
      'foo/*',
      'foo/bar',
    ];

    specs.forEach((spec) => {
      try {
        new Matcher(spec);
        throw new Error(`Expected path spec '${spec}' to be rejected`);
      } catch (error) {
        strictEqual(error.message, 'Path must begin with a slash');
      }
    });
  });
});