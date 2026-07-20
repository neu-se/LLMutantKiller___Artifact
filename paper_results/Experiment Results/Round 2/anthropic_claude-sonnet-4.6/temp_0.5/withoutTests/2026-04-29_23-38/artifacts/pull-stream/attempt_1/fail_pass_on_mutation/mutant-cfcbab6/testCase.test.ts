import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("processes all through streams and sink correctly", () => {
    const log: string[] = [];
    
    let sourceCallCount = 0;
    const source = (end: any, cb: Function) => {
      if (end || sourceCallCount++ > 0) return cb(true);
      cb(null, 42);
    };
    
    const through1 = (read: Function) => {
      log.push("through1 applied");
      return (end: any, cb: Function) => {
        read(end, (end: any, data: any) => {
          if (end) return cb(end);
          log.push(`through1 got ${data}`);
          cb(null, data + 1);
        });
      };
    };
    
    const through2 = (read: Function) => {
      log.push("through2 applied");
      return (end: any, cb: Function) => {
        read(end, (end: any, data: any) => {
          if (end) return cb(end);
          log.push(`through2 got ${data}`);
          cb(null, data + 10);
        });
      };
    };
    
    const results: number[] = [];
    const sink = (read: Function) => {
      log.push("sink applied");
      const drain = () => {
        read(null, (end: any, data: any) => {
          if (end) return;
          results.push(data);
          drain();
        });
      };
      drain();
    };
    
    pull(source, through1, through2, sink);
    
    // through1 transforms 42 -> 43, through2 transforms 43 -> 53
    expect(results).toEqual([53]);
    expect(log).toContain("through1 applied");
    expect(log).toContain("through2 applied");
    expect(log).toContain("sink applied");
  });
});