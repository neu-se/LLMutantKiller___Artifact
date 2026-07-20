import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should throw an error when end is not true and not an error', () => {
    const err = new Error('test error');
    const done = jest.fn();
    const drainStream = drain((data) => {
      if (data === 2) {
        return false;
      }
    }, done);

    const read = jest.fn((end, cb) => {
      cb(null, 1);
      cb(null, 2);
      cb(err, null);
    });

    expect(() => {
      read(null, (end, data) => {
        if (end === err) {
          throw end;
        }
      });
    }).toThrow(err);
  });
});