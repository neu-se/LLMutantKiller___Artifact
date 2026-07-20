import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should not call the underlying regex match for strings ending with slash', () => {
    const matcher = Matcher.for('/foo')
    
    // Spy on RegExp.prototype[Symbol.match] to detect if it gets called
    const spy = jest.spyOn(RegExp.prototype, Symbol.match as any)
    
    const result = '/foo/'.match(matcher)
    
    // Original code: returns null before calling super[Symbol.match], so spy not called
    // Mutated code: guard is empty, falls through to super[Symbol.match], so spy IS called
    expect(spy).not.toHaveBeenCalled()
    expect(result).toBeNull()
    
    spy.mockRestore()
  })
})