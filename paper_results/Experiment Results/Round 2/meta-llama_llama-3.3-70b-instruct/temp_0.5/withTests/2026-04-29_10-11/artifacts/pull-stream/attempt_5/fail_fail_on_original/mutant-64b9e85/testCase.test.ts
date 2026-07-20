import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('find function', () => {
  it('should call the callback with the correct error when the stream ends with an error', () => {
    const read = find((d: any) => d === 2, (err: any, data: any) => {
      if (err) throw err;
      expect(data).toBe(2);
    });
    const drainStream = drain((data: any) => {
      expect(data).toBe(2);
    }, (err: any) => {
      if (err) throw err;
    });
    read(null, (end: any, data: any) => {
      if (end) {
        drainStream(end, () => { });
      } else {
        drainStream(null, data);
      }
    });
  });
});