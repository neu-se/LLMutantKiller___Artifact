import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import { Readable } from "stream";

describe('find sink error handling', () => {
  it('should handle true error value correctly', (done) => {
    const callback = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBeNull();
      done();
    };

    const source = find((data: any) => false, callback);

    // Create a readable stream that emits an error
    const readable = new Readable({
      read() {
        this.destroy(true);
      }
    });

    readable.pipe(source);
  });
});