import values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("values source", () => {
  it("should not call onAbort when reading normally without abort signal", (done) => {
    const onAbort = jest.fn();
    const read = values([1, 2, 3], onAbort);

    read(null, (err: any, value: any) => {
      // Give any async onAbort call a chance to fire
      setImmediate(() => {
        expect(onAbort).not.toHaveBeenCalled();
        expect(value).toBe(1);
        done();
      });
    });
  });
});