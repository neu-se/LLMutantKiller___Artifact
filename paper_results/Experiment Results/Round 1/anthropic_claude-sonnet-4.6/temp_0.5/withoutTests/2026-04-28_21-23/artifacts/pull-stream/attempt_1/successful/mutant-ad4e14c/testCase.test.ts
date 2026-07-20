import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("through onEnd callback argument", () => {
  it("should call onEnd with null when stream ends normally (abort === true)", (done) => {
    const receivedArgs: any[] = [];
    
    const onEnd = (err: any) => {
      receivedArgs.push(err);
    };

    // Create a simple source that ends immediately
    const source = (end: any, cb: Function) => {
      if (end) {
        cb(end, null);
        return;
      }
      cb(true, null); // signal end of stream
    };

    const throughStream = through(null, onEnd);
    const sink = throughStream(source);

    // Read from the stream - when source returns true (end), once(true) is called
    sink(null, (end: any, data: any) => {
      // end === true here, so once(true) should be called
      // onEnd should receive null (not true) in original
      // onEnd should receive true in mutated code
      
      expect(receivedArgs).toHaveLength(1);
      expect(receivedArgs[0]).toBeNull(); // original: abort===true => null; mutated: always abort => true
      done();
    });
  });
});