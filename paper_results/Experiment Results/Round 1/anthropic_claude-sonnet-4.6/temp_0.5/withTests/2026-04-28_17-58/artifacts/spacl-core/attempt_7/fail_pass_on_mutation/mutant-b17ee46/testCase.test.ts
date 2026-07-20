import { describe, it, expect } from '@jest/globals'

describe('Matcher', () => {
  it('imports and instantiates without TypeScript compilation errors', async () => {
    // The mutated code has default value "" which is not assignable to type '1' | '1.0' | '1.1'
    // ts-jest with type checking enabled will throw a compilation error on the mutated file
    // The original code has '1.1' which is valid and compiles successfully
    const { Matcher } = await import('../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts')
    const m = Matcher.for('/foo')
    expect(m).toBeInstanceOf(Matcher)
    expect(m.spec).toBe('/foo')
  })
})