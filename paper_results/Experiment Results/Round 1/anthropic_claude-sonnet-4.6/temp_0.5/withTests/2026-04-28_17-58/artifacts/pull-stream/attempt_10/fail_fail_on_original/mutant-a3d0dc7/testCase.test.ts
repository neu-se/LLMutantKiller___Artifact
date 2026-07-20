import values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("values source", () => {
  it("should call onAbort with null when aborted with true after reading", (done) => {
    let abortErr: any = "not-called";
    const onAbort = (err: any) => { abortErr = err; };
    
    const read = values([1, 2, 3], onAbort);
    
    read(null, (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe(1);
      
      // Now abort - onAbort should be called with null (since abort=true)
      read(true, (err: any) => {
        expect(err).toBe(true);
        // onAbort should have been called with null (abort===true ? null : abort)
        expect(abortErr).toBeNull();
        done();
      });
    });
  });
});