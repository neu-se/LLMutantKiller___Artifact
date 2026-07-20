import once from "../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js"

describe('once source with abort', () => {
  it('should call cb with abort error when aborted, not with the value', () => {
    const cbResults: Array<{ err: any; val: any }> = [];
    
    const onAbort = () => {};
    
    const source = once('hello', onAbort);
    
    // Abort the source
    source(true, (err: any, val: any) => {
      cbResults.push({ err, val });
    });
    
    // In original code: abort=true triggers abortCb which calls cb with the abort error (true)
    // In mutated code: if(false) never runs, so it falls through to check value != null
    // and returns the value 'hello' instead of aborting
    
    expect(cbResults.length).toBe(1);
    // Original: cb is called with err=true (abort signal), not with the value
    expect(cbResults[0].err).toBeTruthy();
    // The value should NOT be 'hello' - it should be aborted
    expect(cbResults[0].val).not.toBe('hello');
  });
});