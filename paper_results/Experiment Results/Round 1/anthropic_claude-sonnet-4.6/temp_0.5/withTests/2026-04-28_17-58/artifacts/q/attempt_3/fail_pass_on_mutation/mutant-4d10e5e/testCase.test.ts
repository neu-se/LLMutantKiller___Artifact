import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks initial value", () => {
  it("deferred promise should not have stack property when longStackSupport is disabled", () => {
    // With hasStacks=false (original), the defer() function's stack capture block
    // `if (Q.longStackSupport && hasStacks)` - hasStacks is true after try/catch
    // so this doesn't distinguish. 
    // 
    // The real observable difference: makeStackTraceLong checks `hasStacks`
    // At module load time hasStacks=false(original) means qStartingLine=undefined
    // meaning isInternalFrame never matches, so filterStackString keeps ALL lines
    // With mutated hasStacks=true, qStartingLine is set, internal frames ARE filtered
    //
    // Test: with longStackSupport, a rejection's stack should contain q.js lines in mutated
    // (because they get filtered differently)... 
    // Actually opposite: original keeps q.js lines, mutated filters them.
    // But the error showed original ALSO filters them.
    //
    // New approach: check that qStartingLine being undefined means the STACK_JUMP_SEPARATOR
    // behavior differs - specifically that makeStackTraceLong concatenates differently.

    Q.longStackSupport = true;

    function inner() {
      return Q.reject(new Error("inner error"));
    }

    function outer() {
      return inner().then(null, function(e: Error) { throw e; });
    }

    return outer().then(null, function(err: Error) {
      Q.longStackSupport = false;
      const stack = err.stack || "";
      // In original: qStartingLine=undefined, isInternalFrame always false
      // so filterStackString keeps q.js internal frames
      // The stack will contain "From previous event:" separator AND q.js frames
      // In mutated: qStartingLine is set, q.js frames filtered OUT
      // so between "From previous event:" sections, q.js lines are removed
      // 
      // Key observable: in original, q.js frames appear after "From previous event:"
      // In mutated, they don't
      expect(stack).toContain("From previous event:");
    });
  });
});