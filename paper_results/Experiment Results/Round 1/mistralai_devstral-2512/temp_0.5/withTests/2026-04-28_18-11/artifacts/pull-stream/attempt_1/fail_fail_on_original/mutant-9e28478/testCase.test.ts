import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with two arguments', () => {
  it('should correctly handle partial application with two arguments', (done) => {
    const mockRead = jest.fn((abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, 'test-data');
      }
    });

    const mockSink1 = jest.fn((read) => {
      return (abort, cb) => {
        read(abort, (end, data) => {
          if (end) {
            cb(end);
          } else {
            cb(null, data + '-processed1');
          }
        });
      };
    });

    const mockSink2 = jest.fn((read) => {
      return (abort, cb) => {
        read(abort, (end, data) => {
          if (end) {
            cb(end);
          } else {
            cb(null, data + '-processed2');
          }
        });
      };
    });

    const partialSink = pull(mockSink1, mockSink2);
    const result = partialSink(mockRead);

    result(null, (end, data) => {
      expect(end).toBeNull();
      expect(data).toBe('test-data-processed1-processed2');
      expect(mockSink1).toHaveBeenCalled();
      expect(mockSink2).toHaveBeenCalled();
      done();
    });
  });
});