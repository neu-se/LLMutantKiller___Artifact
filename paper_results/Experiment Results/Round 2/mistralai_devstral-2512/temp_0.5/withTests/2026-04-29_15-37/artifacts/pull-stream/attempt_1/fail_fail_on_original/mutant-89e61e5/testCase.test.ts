import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("partial sink should throw when called twice", () => {
  it("should throw TypeError when partial sink is called twice", (done) => {
    const partialSink = pull((read: any) => {
      // This is a partial sink that should only be called once
      return (end: any, cb: any) => {
        if (end) {
          cb(end);
        } else {
          read(null, (end: any, data: any) => {
            cb(end, data);
          });
        }
      };
    });

    const source = (end: any, cb: any) => {
      if (end) {
        cb(end);
      } else {
        cb(null, 1);
      }
    };

    const read = partialSink(source);

    // First call should work
    read(null, (end: any, data: any) => {
      expect(data).toBe(1);

      // Second call should throw
      expect(() => {
        read(null, (end: any, data: any) => {});
      }).toThrow(TypeError);

      done();
    });
  });
});