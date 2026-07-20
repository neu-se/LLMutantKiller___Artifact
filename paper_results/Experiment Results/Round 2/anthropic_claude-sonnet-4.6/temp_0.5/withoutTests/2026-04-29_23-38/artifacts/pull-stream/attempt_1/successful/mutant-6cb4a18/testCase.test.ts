import infinite from "../../../../../../../../../../../subject_repositories/pull-stream/sources/infinite.js";

describe("infinite source", () => {
  it("should call cb with end signal when end is truthy", () => {
    const generate = () => 42;
    const source = infinite(generate);
    
    const cb = jest.fn();
    const endSignal = true;
    
    source(endSignal, cb);
    
    // In original code: if(end) return cb && cb(end) — cb should be called with the end signal
    // In mutated code: if(false) — the condition never triggers, so cb gets called with (null, generate()) instead
    expect(cb).toHaveBeenCalledWith(endSignal);
    expect(cb).not.toHaveBeenCalledWith(null, 42);
  });
});