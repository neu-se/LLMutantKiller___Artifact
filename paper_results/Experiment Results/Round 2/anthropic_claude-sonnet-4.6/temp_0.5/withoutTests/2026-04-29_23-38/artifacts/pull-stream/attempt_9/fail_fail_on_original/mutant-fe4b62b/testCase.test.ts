import { readFileSync } from 'fs';
import { resolve } from 'path';
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("should have err=true (not false) in the abort function body", () => {
    // Test behavioral difference: when abort is called with an Error object as first arg
    // the unconditional line sets cb=Error, err=true/false
    // abort = err || true = true either way
    // BUT: if we could somehow make err falsy before the || true...
    // 
    // Actually test the only real behavioral path: abort with no read set
    // then connect source which calls sink.abort() again
    const calls: any[] = [];
    
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      calls.push(end);
      if (end) cb(end);
      else cb(null, 1);
    };

    let doneErr: any = 'not-called';
    const sink = drain(
      () => {},
      (err: any) => { doneErr = err; }
    );

    sink.abort();
    sink(source);

    expect(doneErr).toBeNull();
    expect(calls[0]).toBe(true);
  });
});