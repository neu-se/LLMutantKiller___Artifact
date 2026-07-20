import { Policy, Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/policy';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('policy clone', () => {
  it('should clone policy correctly with deep cloning', () => {
    const originalRule = Rule.for('/test').allow('foo', 'bar');
    const originalPolicy = Policy.for('original', originalRule);
    const clonedPolicy = originalPolicy.clone('cloned', true);
    originalRule.deny('foo', 'bar', 'boo');
    originalPolicy.push(Rule.for('/test').allow('baz'));
    strictEqual(clonedPolicy.query('/test', 'foo'), null);
    strictEqual(clonedPolicy.query('/test', 'bar'), null);
    strictEqual(clonedPolicy.query('/test', 'boo'), null);
    strictEqual(clonedPolicy.query('/test', 'baz'), null);
  });
});