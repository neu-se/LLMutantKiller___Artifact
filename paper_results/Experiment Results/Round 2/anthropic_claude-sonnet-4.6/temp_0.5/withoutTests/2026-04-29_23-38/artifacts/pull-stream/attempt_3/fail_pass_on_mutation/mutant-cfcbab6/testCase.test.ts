import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should correctly pipe source through multiple through streams to a sink", () => {
    const results: number[] = [];
    let sourceCount = 0;
    
    const source = (end: any, cb: Function) => {
      if (end || sourceCount >= 2) return cb(true);
      cb(null, ++sourceCount);
    };
    
    const addTen = (read: Function) => (end: any, cb: Function) => {
      read(end, (end: any, data: any) => {
        if (end) return cb(end);
        cb(null, data + 10);
      });
    };
    
    const double = (read: Function) => (end: any, cb: Function) => {
      read(end, (end: any, data: any) => {
        if (end) return cb(end);
        cb(null, data * 2);
      });
    };
    
    const sink = (read: Function) => {
      const drain = () => {
        read(null, (end: any, data: any) => {
          if (end) return;
          results.push(data);
          drain();
        });
      };
      drain();
    };
    
    pull(source, addTen, double, sink);
    
    // source emits 1, 2
    // addTen: 1->11, 2->12
    // double: 11->22, 12->24
    expect(results).toEqual([22, 24]);
  });
});