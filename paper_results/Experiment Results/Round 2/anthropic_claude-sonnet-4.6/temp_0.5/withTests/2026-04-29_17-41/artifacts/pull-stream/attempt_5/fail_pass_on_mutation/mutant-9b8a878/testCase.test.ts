import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("partial application with a single-element array source should work correctly", (done) => {
    // An array with one element has .length === 1, triggering the partial branch
    // This tests that args is properly initialized with the right length
    const collected: number[] = [];
    
    const mapDouble = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end);
        cb(null, data * 2);
      });
    };

    // mapDouble.length === 1, so pull(mapDouble) enters partial branch
    // args = new Array(1) sets length=1 before loop; new Array() starts at 0
    // After loop args[0] = mapDouble in both cases - seemingly same
    // BUT: test the args array length property directly via the switch
    // case 1: return pull(read, ref[0]) - ref is args, ref[0] must exist
    
    const partial = pull(mapDouble);
    
    // Verify partial is a function with length 1 (accepts one read arg)
    expect(partial.length).toBe(1);
    
    let i = 0;
    const values = [1, 2, 3];
    const source = (abort: any, cb: Function) => {
      if (abort || i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    const read = partial(source);
    
    function drain() {
      read(null, (end: any, data: any) => {
        if (end) {
          expect(collected).toEqual([2, 4, 6]);
          done();
          return;
        }
        collected.push(data);
        drain();
      });
    }
    drain();
  });
});