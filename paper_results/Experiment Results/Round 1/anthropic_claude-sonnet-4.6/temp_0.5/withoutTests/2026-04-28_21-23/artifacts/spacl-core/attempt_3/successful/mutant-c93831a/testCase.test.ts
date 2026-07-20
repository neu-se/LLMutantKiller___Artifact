import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher [Symbol.match]', () => {
  it('should return null for strings ending with slash when length > 1', () => {
    const matcher = new Matcher('/foo')
    
    // Spy on the instance to intercept super calls
    const spy = jest.spyOn(Object.getPrototypeOf(Object.getPrototypeOf(matcher)), Symbol.match)
      .mockReturnValue(['/foo/'] as any)
    
    const result = '/foo/'.match(matcher)
    
    spy.mockRestore()
    
    expect(result).toBeNull()
  })
})