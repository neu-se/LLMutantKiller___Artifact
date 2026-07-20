import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort functionality', () => {
  it('should handle abort with function as first argument', () => {
    const sink = drain(() => false);
    let abortCalled = false;
    let abortValue: any = null;

    const mockRead = (abort: any, cb: any) => {
      abortCalled = true;
      abortValue = abort;
      cb();
    };

    // Call the sink to set up the read function
    (sink as any)(mockRead);

    // Call abort with a function as first argument
    (sink as any).abort(() => {});

    // Verify the behavior
    expect(abortCalled).toBe(true);
    expect(abortValue).toBe(true);
  });
});