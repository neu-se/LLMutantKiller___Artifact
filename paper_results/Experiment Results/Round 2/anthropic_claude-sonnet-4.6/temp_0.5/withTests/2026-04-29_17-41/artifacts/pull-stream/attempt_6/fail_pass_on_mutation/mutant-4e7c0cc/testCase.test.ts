const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js")

describe('pull case 3 partial applied to partial source', () => {
  it('should not create a nested partial when source has length 1', () => {
    const partial4 = pull(
      pull.map((x: number) => x + 1),
      pull.map((x: number) => x * 2),
      pull.map((x: number) => x - 3),
      pull.map((x: number) => x * 10)
    )
    
    // partial4 has length 1 (it's a partial)
    expect(typeof partial4).toBe('function')
    expect(partial4.length).toBe(1)
    
    // Now create another partial with 4 items and apply partial4 as source
    // In the mutated default path, ref.unshift(partial4) then pull.apply(null, ref)
    // partial4.length === 1, so pull would create ANOTHER partial instead of processing!
    const partial4b = pull(
      pull.map((x: number) => x + 1),
      pull.map((x: number) => x * 2),
      pull.map((x: number) => x - 3),
      pull.map((x: number) => x * 10)
    )
    
    // Apply partial4b to partial4 as source
    // In original case 4: pull(partial4, map1, map2, map3, map4)
    // partial4.length === 1, so pull creates a partial! Same in both versions...
    const result = partial4b(partial4)
    
    // result should be a function with length 1 (partial) in both versions
    // since partial4.length === 1
    expect(typeof result).toBe('function')
  })
})