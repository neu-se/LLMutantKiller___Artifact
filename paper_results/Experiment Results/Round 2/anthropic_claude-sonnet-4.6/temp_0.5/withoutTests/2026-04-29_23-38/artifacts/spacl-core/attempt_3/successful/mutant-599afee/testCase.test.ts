import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule"

describe('Rule', () => {
  it('should return null when context property is undefined and capture is also undefined', () => {
    // Use :param style (colon is in allowed chars)
    const rule = Rule.for('/:userId/profile')
    rule.allow('read')
    
    // Add extra prop with no corresponding capture group
    ;(rule.regex.props as string[]).push('extraProp')
    
    const result = rule.query('/john/profile', 'read', { userId: 'john' })
    expect(result).toBeNull()
  })
})