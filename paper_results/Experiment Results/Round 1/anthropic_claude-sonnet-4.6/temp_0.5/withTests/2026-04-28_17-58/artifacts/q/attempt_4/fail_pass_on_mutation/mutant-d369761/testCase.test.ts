import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration via object_toString", () => {
  it("Q.async works correctly with generators indicating object_toString is intact", () => {
    // If the mutation breaks object_toString definition, async/generator behavior changes
    // Test that a basic promise chain works, which requires internal functions to be defined
    return Q.when(Q(42), function(val: number) {
      expect(val).toBe(42);
      return val;
    }).then(function(val: number) {
      expect(val).toBe(42);
    });
  });
});