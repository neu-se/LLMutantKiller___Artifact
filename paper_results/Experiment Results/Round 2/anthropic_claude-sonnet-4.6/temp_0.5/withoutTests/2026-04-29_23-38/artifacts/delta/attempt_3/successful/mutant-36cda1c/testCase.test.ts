import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("Delta.eachLine", () => {
  it("should call iter.next with no arguments (not 1) for embed ops", () => {
    const originalNext = OpIterator.prototype.next;
    const calls: (number | undefined)[] = [];
    
    OpIterator.prototype.next = function(length?: number) {
      calls.push(length);
      return originalNext.call(this, length);
    };

    try {
      const delta = new Delta()
        .insert({ image: "url" })
        .insert("\n");

      delta.eachLine(() => {});

      // With original code (index=-1): iter.next() called with no args (undefined)
      // With mutated code (index=+1): iter.next(1) called with length=1
      // Find the call that processes the embed (not the "\n" which uses iter.next(1) too)
      // The embed should be processed with iter.next() (no arg) in original
      // but iter.next(1) in mutated
      
      // In original: for embed, next() is called (undefined arg)
      // In mutated: for embed, next(1) is called
      expect(calls).toContain(undefined);
    } finally {
      OpIterator.prototype.next = originalNext;
    }
  });
});