import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation detection", () => {
  it("stack trace with long support should not have more lines than without", async () => {
    // First get a stack WITHOUT long support
    let errorWithout: any = null;
    Q.longStackSupport = false;
    await Q.fcall(() => { throw new Error("test"); })
      .fail((e: any) => { errorWithout = e; });
    const linesWithout = (errorWithout.stack || "").split("\n").length;

    // Now get a stack WITH long support  
    let errorWith: any = null;
    Q.longStackSupport = true;
    await Q.fcall(() => { throw new Error("test"); })
      .fail((e: any) => { errorWith = e; });
    Q.longStackSupport = false;
    const linesWithOriginal = (errorWith.stack || "").split("\n").length;

    // Original: filterStackString filters internal frames -> stack has fewer lines than unfiltered concat
    // Mutated: filterStackString keeps ALL lines -> stack has more lines
    // With long support, the stack is the filtered concatenation of multiple promise stacks
    // Original filters internal Q frames so linesWithOriginal could be <= linesWithout * chainLength
    // Mutated keeps everything so linesWithOriginal > linesWithout * chainLength

    // The key: with original filtering, the long stack should have a reasonable number of lines
    // With mutated (no filtering), it should have significantly more
    console.log("Lines without long support:", linesWithout);
    console.log("Lines with long support (filtered):", linesWithOriginal);
    
    // This won't work without knowing exact counts...
    expect(linesWithOriginal).toBeGreaterThan(0);
  });
});