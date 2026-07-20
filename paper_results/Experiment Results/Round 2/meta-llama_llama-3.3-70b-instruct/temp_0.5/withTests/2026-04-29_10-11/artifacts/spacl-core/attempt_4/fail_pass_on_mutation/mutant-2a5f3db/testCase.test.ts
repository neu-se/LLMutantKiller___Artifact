import { Policy } from '../../../../../../../../../../../subject_repositories/spacl-core/src/policy';
import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('policy', () => {
  it('clones itself correctly with deep copy', () => {
    const rule1 = Rule.for('/test').allow('foo', 'bar')
    const original = Policy.for('original', rule1)
    const shallow = original.clone('shallow', false)
    const deep = original.clone('deep', true)
    original.push(Rule.for('/test').allow('baz'))
    rule1.deny('foo', 'bar', 'boo')
    expect(shallow.rules[0].query('/test', 'foo')).toBe(false)
    expect(deep.rules[0].query('/test', 'foo')).toBe(true)
  })
})