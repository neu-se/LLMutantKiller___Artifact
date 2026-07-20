import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation detection", () => {
  it("isInternalFrame only filters q.js frames not other files", async () => {
    Q.longStackSupport = true;

    // Create error with controlled stack containing frames at specific line numbers
    const err = new Error("test");
    
    // Frame at line 1 of a non-q file - should be preserved by original, filtered by mutation
    // Frame at line 9999 of a non-q file - should be preserved by both
    Object.defineProperty(err, 'stack', {
      value: [
        'Error: test',
        '    at lowLineFunc (usercode.js:1:1)',
        '    at highLineFunc (usercode.js:9999:1)'
      ].join('\n'),
      configurable: true,
      writable: true
    });

    let finalError: any;
    const d = Q.defer();
    d.promise.then(function() { throw err; }).fail(function(e: any) { finalError = e; });
    d.resolve(1);
    
    await new Promise(r => setTimeout(r, 50));

    const stack: string = finalError?.stack ?? "";
    
    // Both frames should survive with original (usercode.js !== qFileName)
    // lowLineFunc filtered with mutation (line 1 <= qEndingLine)
    // highLineFunc preserved with mutation (line 9999 > qEndingLine)
    expect(stack).toContain("lowLineFunc");
    expect(stack).toContain("highLineFunc");
  });
});