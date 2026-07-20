import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("reads from source the correct number of times with sync source", () => {
    const sideEffects: string[] = [];
    let idx = 0;
    const items = [1, 2];
    
    function source(end: any, cb: (err: any, data?: any) => void) {
      sideEffects.push(`read(${end})`);
      if (end) { cb(end); return; }
      if (idx < items.length) {
        const val = items[idx++];
        sideEffects.push(`before-cb(${val})`);
        cb(null, val);
        sideEffects.push(`after-cb(${val})`);
      } else {
        cb(true);
      }
    }
    
    drain(
      (x: number) => { sideEffects.push(`op(${x})`); },
      (err: any) => { sideEffects.push(`done(${err})`); }
    )(source);
    
    expect(sideEffects).toEqual([
      'read(null)', 'before-cb(1)', 'op(1)', 'after-cb(1)',
      'read(null)', 'before-cb(2)', 'op(2)', 'after-cb(2)',
      'read(null)', 'done(null)'
    ]);
  });
});