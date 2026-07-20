import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("promise error handling when handler throws without domain", () => {
  it("should continue processing subsequent promises after a handler throws", done => {
    // With the mutation (if (true) instead of if (isNodeJS)), when a task throws
    // and there is no domain, the code tries to call domain.exit() where domain
    // is undefined, causing a TypeError that breaks the flush loop entirely.
    
    const resolved: number[] = [];
    
    // Schedule a task that throws
    Q.fcall(function() {
      throw new Error("intentional");
    }).fail(function() {
      // swallow
    });
    
    // Schedule a subsequent task that should resolve
    Q.fcall(function() {
      return 42;
    }).then(function(val: number) {
      resolved.push(val);
      expect(resolved).toEqual([42]);
      done();
    });
    
    setTimeout(function() {
      if (resolved.length === 0) {
        done(new Error("subsequent promise never resolved - flush was broken"));
      }
    }, 500);
  });
});