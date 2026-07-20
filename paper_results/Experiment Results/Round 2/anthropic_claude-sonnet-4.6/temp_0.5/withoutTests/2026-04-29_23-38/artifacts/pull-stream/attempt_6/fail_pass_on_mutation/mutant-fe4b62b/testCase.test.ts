import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("should complete normally when stream ends", () => {
    const results: number[] = [];
    let i = 0;
    
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) { cb(end); return; }
      if (i < 3) cb(null, ++i);
      else cb(true);
    };

    let completed = false;
    let completionError: any = undefined;

    drain(
      (data: any) => { results.push(data); },
      (err: any) => { completed = true; completionError = err; }
    )(source);

    expect(completed).toBe(true);
    expect(completionError).toBeNull();
    expect(results).toEqual([1, 2, 3]);
  });
});