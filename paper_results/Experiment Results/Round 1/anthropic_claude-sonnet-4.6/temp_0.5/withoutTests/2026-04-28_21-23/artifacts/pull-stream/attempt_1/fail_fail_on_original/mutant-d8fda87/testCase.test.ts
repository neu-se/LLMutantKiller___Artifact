import { once } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js"

describe('once source with abort', () => {
  it('should call onAbort and cb with abort value when aborted', () => {
    const onAbortCalled: boolean[] = [];
    const cbResults: any[] = [];
    
    const onAbort = () => {
      onAbortCalled.push(true);
    };
    
    const source = once('hello', onAbort);
    
    // Abort the source
    source(true, (err: any, val: any) => {
      cbResults.push({ err, val });
    });
    
    // In original code: abort=true triggers abortCb which calls cb with the abort error
    // In mutated code: if(false) never runs, so it falls through to check value != null
    // and returns the value instead of aborting
    
    // The callback should be called with an error (truthy) when aborted
    expect(cbResults.length).toBe(1);
    expect(cbResults[0].err).toBeTruthy();
    expect(cbResults[0].val).toBeUndefined();
  });
});