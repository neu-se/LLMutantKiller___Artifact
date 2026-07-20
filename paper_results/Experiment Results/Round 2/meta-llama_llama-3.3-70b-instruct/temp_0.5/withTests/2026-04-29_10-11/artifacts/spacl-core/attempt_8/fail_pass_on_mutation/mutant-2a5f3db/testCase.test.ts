import { Policy } from '../../../../../../../../../../../subject_repositories/spacl-core/src/policy';
import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('policy', () => {
  it('clones itself correctly with deep copy', () => {
    const rule1 = Rule.for('/test').allow('foo', 'bar')
    const original = Policy.for('original', rule1)
    const shallow = original.clone('shallow', false)
    original.push(Rule.for('/test').allow('baz'))
    rule1.deny('foo', 'bar', 'boo')
    expect(shallow.query('/test', 'foo')).toBe(false)
    expect(original.query('/test', 'foo')).toBe(false)
    expect(original.query('/test', 'baz')).toBe(true)
  })
})