import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when end is not true and no done callback is provided', (done) => {
    const error = new Error('Test error');
    const read = jest.fn((err: any, cb: (end: any, data: any) => void) => {
      cb(error, null);
    });
    const sink = drainModule.default(null, null);
    expect(() => {
      sink(read);
    }).toThrowError(error);
    done();
  });
});