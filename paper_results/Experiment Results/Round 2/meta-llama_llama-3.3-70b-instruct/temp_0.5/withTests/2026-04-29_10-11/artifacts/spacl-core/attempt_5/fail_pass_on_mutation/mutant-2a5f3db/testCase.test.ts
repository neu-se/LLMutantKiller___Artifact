import { Policy } from '../../../../../../../../../../../subject_repositories/spacl-core/src/policy';
import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('policy', () => {
  it('clones itself correctly with deep copy', () => {
    const rule1 = Rule.for('/test').allow('foo', 'bar')
    const original = Policy.for('original', rule1)
    const deep = original.clone('deep', true)
    original.push(Rule.for('/test').allow('baz'))
    rule1.deny('foo', 'bar', 'boo')
    expect(deep.query('/test', 'foo')).toBe(true)
    expect(deep.query('/test', 'bar')).toBe(true)
    expect(deep.query('/test', 'boo')).toBe(null)
    expect(deep.query('/test', 'baz')).toBe(null)
  })
})