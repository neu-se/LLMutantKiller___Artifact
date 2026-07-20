import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull with non-function first argument of length 1', () => {
  it('should not treat a non-function with length 1 as a partial pipeline', () => {
    // A single-character string has .length === 1 but is not a function
    // Original: typeof "x" === 'function' is false, skips partial sink branch
    // Mutated: true && "x".length === 1 is true, enters partial sink branch (returns function instead)
    const result = pull("x" as any)
    // In original code, "x" is treated as a source/read and returned directly
    expect(typeof result).toBe('string')
    expect(result).toBe('x')
  })
})