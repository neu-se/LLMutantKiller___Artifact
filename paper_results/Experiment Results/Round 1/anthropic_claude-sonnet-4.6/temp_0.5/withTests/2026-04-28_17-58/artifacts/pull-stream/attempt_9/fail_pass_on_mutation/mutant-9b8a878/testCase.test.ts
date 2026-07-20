import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("should correctly compose pipeline with 5 through functions using partial application", () => {
    const log: string[] = [];
    
    const makeThrough = (name: string) => (read: Function) => {
      log.push(`created:${name}`);
      return (abort: any, cb: Function) => {
        read(abort, (end: any, data: number) => {
          if (end) return cb(end);
          log.push(`data:${name}:${data}`);
          cb(null, data + 1);
        });
      };
    };

    const t1 = makeThrough("t1");
    const t2 = makeThrough("t2");
    const t3 = makeThrough("t3");
    const t4 = makeThrough("t4");
    const t5 = makeThrough("t5");

    // 5 args hits default case: ref.unshift(read); pull.apply(null, ref)
    const pipeline = pull(t1, t2, t3, t4, t5);

    let i = 0;
    const source = (abort: any, cb: Function) => {
      if (abort || i++ > 0) return cb(true);
      cb(null, 0);
    };

    const read = pipeline(source);

    let result: number | null = null;
    read(null, (end: any, data: number) => {
      if (!end) result = data;
    });

    expect(result).toBe(5);
    expect(log).toContain("created:t1");
    expect(log).toContain("created:t5");
  });
});