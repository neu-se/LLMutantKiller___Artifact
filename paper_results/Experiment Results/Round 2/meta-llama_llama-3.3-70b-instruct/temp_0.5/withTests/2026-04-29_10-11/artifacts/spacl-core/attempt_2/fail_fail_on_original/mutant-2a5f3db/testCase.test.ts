import { Policy, Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/policy';
import { QueryContext } from '../../../../../../../../../../../subject_repositories/spacl-core/src/queryable';

describe('policy', () => {
  it('clones itself correctly with deep copy', () => {
    const rule1 = (require('../../../../../../../../../subject_repositories/spacl-core/src/rule')).Rule.for('/test').allow('foo', 'bar')
    const original = Policy.for('original', rule1)
    const deep = original.clone('deep', true)
    original.push((require('../../../../../../../../../subject_repositories/spacl-core/src/rule')).Rule.for('/test').allow('baz'))
    rule1.deny('foo', 'bar', 'boo')
    const result1 = deep.query('/test', 'foo')
    const result2 = deep.query('/test', 'bar')
    const result3 = deep.query('/test', 'boo')
    const result4 = deep.query('/test', 'baz')
    expect(result1).toBe(true)
    expect(result2).toBe(true)
    expect(result3).toBe(null)
    expect(result4).toBe(null)
  })
})