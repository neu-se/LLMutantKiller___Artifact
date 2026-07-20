import { Policy } from '../../../../../../../../../../../subject_repositories/spacl-core/src/policy';
import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('policy clone', () => {
  it('should clone policy correctly with default deep cloning', () => {
    const originalRule = new Rule('/test').allow('foo', 'bar');
    const originalPolicy = new Policy('original', originalRule);
    const clonedPolicy = originalPolicy.clone('cloned');
    originalRule.deny('foo', 'bar', 'boo');
    strictEqual(clonedPolicy.query('/test', 'foo'), true);
    strictEqual(clonedPolicy.query('/test', 'bar'), true);
    strictEqual(clonedPolicy.query('/test', 'boo'), null);
  });
});