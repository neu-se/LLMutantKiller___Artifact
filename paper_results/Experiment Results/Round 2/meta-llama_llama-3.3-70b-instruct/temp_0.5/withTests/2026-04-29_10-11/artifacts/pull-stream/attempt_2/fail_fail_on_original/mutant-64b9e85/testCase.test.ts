import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the callback with the correct error when the stream ends with an error', () => {
    let error: any;
    let data: any;

    find(null, (err: any, d: any) => {
      error = err;
      data = d;
    })(true, (err: any) => {
      throw err;
    });

    expect(error).toBeNull();
    expect(data).toBeUndefined();
  });
});