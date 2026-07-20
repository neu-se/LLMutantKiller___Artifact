import { Policy, Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/policy';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('policy clone', () => {
  it('should clone policy correctly with deep cloning', () => {
    const originalRule = new (require('../../../../../../../../../subject_repositories/spacl-core/src/rule')).Rule('/test').allow('foo', 'bar');
    const originalPolicy = new Policy('original', originalRule);
    const clonedPolicy = originalPolicy.clone('cloned', true);
    originalRule.deny('foo', 'bar', 'boo');
    originalPolicy.push(new (require('../../../../../../../../../subject_repositories/spacl-core/src/rule')).Rule('/test').allow('baz'));
    strictEqual(clonedPolicy.query('/test', 'foo'), true);
    strictEqual(clonedPolicy.query('/test', 'bar'), true);
    strictEqual(clonedPolicy.query('/test', 'boo'), null);
    strictEqual(clonedPolicy.query('/test', 'baz'), null);
  });
});