const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js")

describe('pull', () => {
  it('should skip null pipeline stages without throwing', () => {
    // A simple source read function
    const source = (abort: any, cb: Function) => {
      cb(true) // immediately end
    }

    // In original: null fails both if(typeof s==='function') and else if(s && typeof s==='object'), skipped
    // In mutated: null fails first if, but else if(true) runs → null.sink(read) → TypeError
    expect(() => {
      pull(source, null)
    }).not.toThrow()
  })
})