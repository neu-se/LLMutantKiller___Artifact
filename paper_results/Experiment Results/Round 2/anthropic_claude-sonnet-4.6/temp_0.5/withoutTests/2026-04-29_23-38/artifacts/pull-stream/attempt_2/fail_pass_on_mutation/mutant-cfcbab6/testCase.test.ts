import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should invoke the sink function when a sink object is provided", () => {
    const source = (end: any, cb: Function) => cb(true);
    
    let sinkWasCalled = false;
    const sink = {
      sink: (read: Function) => { sinkWasCalled = true; },
      source: null as any
    };
    
    pull(source, sink);
    
    expect(sinkWasCalled).toBe(true);
  });
});