import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("partial sink should throw when called twice", () => {
  it("should throw TypeError when partial sink is called twice", (done) => {
    const partialSink = pull((read: any) => {
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

    read(null, (end: any, data: any) => {
      expect(data).toBe(1);

      try {
        read(null, (end: any, data: any) => {});
        done(new Error("Expected TypeError to be thrown"));
      } catch (err) {
        expect(err).toBeInstanceOf(TypeError);
        expect(err.message).toBe("partial sink should only be called once!");
        done();
      }
    });
  });
});