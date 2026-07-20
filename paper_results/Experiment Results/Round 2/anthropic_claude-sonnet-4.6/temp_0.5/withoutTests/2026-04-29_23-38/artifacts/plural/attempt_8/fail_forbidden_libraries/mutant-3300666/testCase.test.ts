import { jest } from '@jest/globals'

describe("plural", () => {
  it("should initialize rules as an empty array", () => {
    jest.resetModules()
    
    const initialLengths: number[] = []
    const originalUnshift = Array.prototype.unshift
    Array.prototype.unshift = function(...args: any[]) {
      initialLengths.push(this.length)
      return originalUnshift.apply(this, args as any)
    }
    
    require('../../../../../../../../../../../subject_repositories/plural/index.js')
    
    Array.prototype.unshift = originalUnshift
    
    // In original: first unshift call has this.length = 0 (empty array)
    // In mutated: first unshift call has this.length = 1 ("Stryker was here")
    expect(initialLengths[0]).toBe(0)
  })
})