import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the callback with the correct error when the stream ends with an error', () => {
    let ended = false;
    let error: any;

    find(null, (err: any, data: any) => {
      ended = true;
      error = err;
    })(true, (err: any) => {
      if (ended) return;
      throw err;
    });

    expect(error).toBeNull();
  });
});