import { Policy } from '../../../../../../../../../../../subject_repositories/spacl-core/src/policy';
import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('policy clone', () => {
  it('should clone policy correctly with deep cloning', () => {
    const originalRule = new Rule('/test').allow('foo', 'bar');
    const originalPolicy = new Policy('original', originalRule);
    const clonedPolicy = originalPolicy.clone('cloned', true);
    originalRule.deny('foo', 'bar', 'boo');
    originalPolicy.push(new Rule('/test').allow('baz'));
    const clonedRule = clonedPolicy.rules[0];
    strictEqual(clonedRule.query('/test', 'foo'), true);
    strictEqual(clonedRule.query('/test', 'bar'), true);
    strictEqual(clonedRule.query('/test', 'boo'), null);
    strictEqual(clonedRule.query('/test', 'baz'), null);
  });
});