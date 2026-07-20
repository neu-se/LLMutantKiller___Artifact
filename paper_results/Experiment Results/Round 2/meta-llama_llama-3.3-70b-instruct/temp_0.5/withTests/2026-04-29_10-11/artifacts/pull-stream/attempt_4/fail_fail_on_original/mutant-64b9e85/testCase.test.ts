import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import { error } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/error.js";

describe('find function', () => {
  it('should call the callback with the correct error when the stream ends with an error', () => {
    const err = new Error('test error');
    const read = find((d: any) => d === 2, (err: any, data: any) => {
      if (err) throw err;
      expect(data).toBe(2);
    });
    const source = values([1, 2, 3]);
    const stream = read(source);
    stream(true, (err: any) => {
      throw err;
    });
  });
});