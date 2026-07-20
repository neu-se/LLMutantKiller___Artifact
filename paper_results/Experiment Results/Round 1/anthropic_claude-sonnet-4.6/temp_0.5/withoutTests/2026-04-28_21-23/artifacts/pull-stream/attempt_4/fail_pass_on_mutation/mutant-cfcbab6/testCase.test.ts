import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should handle exactly two through streams without error from undefined access", () => {
    // With pull(source, t1, t2, sink) - 4 args, length=4
    // Original inner i<4: i=1,2,3 -> s=t2 (args[3]=sink? no args[3]=sink)
    // Wait: arguments[0]=source, [1]=t1, [2]=t2, [3]=sink
    // Original inner i<4: i=1(s=t1),2(s=t2),3(s=sink) -> s=sink
    // Outer processes sink -> read=sink(read) but sink returns undefined
    // Mutated inner i<=4: i=1,2,3,4 -> s=undefined -> nothing processed
    
    const processed: string[] = []
    const source = (end: any, cb: Function) => cb(null, 1)
    const t1 = (read: Function) => { processed.push('t1'); return read }
    const t2 = (read: Function) => { processed.push('t2'); return read }  
    const sink = (read: Function) => { processed.push('sink'); }
    
    pull(source, t1, t2, sink)
    expect(processed).toContain('sink')
  })
})