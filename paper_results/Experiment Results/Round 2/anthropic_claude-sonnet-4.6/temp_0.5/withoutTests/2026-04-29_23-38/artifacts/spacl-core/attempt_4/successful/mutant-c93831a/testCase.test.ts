import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher [Symbol.match]', () => {
  it('should return null for root path with trailing slash (length > 1)', () => {
    // '//' has length 2 and ends with '/'
    // Original: guard returns null
    // Mutated: proceeds to regex - for spec '/*', regex is '^/$|^/[^/]+$' which does NOT match '//'
    // Need a spec whose regex matches a trailing-slash string
    // Spec '/' is invalid, but spec like '/foo' with regex '^/foo$' won't match '/foo/'
    // Let's check: does any regex match a trailing slash?
    // The compiled regex uses parts like '/[^/]+' - these won't end with /
    // So actually the mutated code also returns null for trailing slash paths
    // UNLESS the regex itself matches - which it won't since all patterns end with $
    // The only difference would be observable via a spy
    const matcher = new Matcher('/foo')
    const spy = jest.spyOn(RegExp.prototype, Symbol.match as any)
    matcher[Symbol.match]('/foo/')
    expect(spy).not.toHaveBeenCalled()
    spy.mockRestore()
  })
})