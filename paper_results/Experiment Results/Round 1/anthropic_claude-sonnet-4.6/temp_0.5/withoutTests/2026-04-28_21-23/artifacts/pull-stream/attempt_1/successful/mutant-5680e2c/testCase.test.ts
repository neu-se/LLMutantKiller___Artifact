import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("through onEnd callback", () => {
  it("should call onEnd with null when stream ends normally (abort === true)", (done) => {
    const endValues: any[] = [];
    
    const onEnd = (err: any) => {
      endValues.push(err);
    };

    const throughStream = through(undefined, onEnd);

    // Create a simple source that ends after one item
    let count = 0;
    const source = (end: any, cb: Function) => {
      if (end) {
        cb(true, null);
        return;
      }
      if (count++ === 0) {
        cb(null, "data");
      } else {
        cb(true, null); // end the stream
      }
    };

    const sink = throughStream(source);

    // Read until end
    const read = () => {
      sink(null, (end: any, data: any) => {
        if (end) {
          // Stream ended, check what onEnd received
          expect(endValues.length).toBeGreaterThan(0);
          expect(endValues[0]).toBeNull(); // original: null, mutated: true
          done();
          return;
        }
        read();
      });
    };

    read();
  });
});