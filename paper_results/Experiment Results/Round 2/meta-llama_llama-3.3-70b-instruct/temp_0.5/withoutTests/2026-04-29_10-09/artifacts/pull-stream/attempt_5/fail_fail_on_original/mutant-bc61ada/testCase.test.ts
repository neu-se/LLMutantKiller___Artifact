import reduceModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should handle ended stream correctly', (done) => {
    const reducer = (acc: any, data: any) => data;
    const cb = (err: any, result: any) => {
      if (err) {
        done(err);
      } else {
        expect(result).toBe(null);
        done();
      }
    };

    const source = (err: any, read: any) => {
      read(true, null);
    };

    const reduce = reduceModule;
    const sink = reduce(reducer, cb);
    sink(source);
  });

  // it('should handle ended stream with error correctly', (done) => {
  //   const reducer = (acc: any, data: any) => data;
  //   const cb = (err: any, result: any) => {
  //     if (err) {
  //       expect(err).toBe('error');
  //       done();
  //     } else {
  //       done(new Error('Expected error'));
  //     }
  //   };

  //   const source = (err: any, read: any) => {
  //     read(true, 'error');
  //   };

  //   const reduce = reduceModule;
  //   const sink = reduce(reducer, cb);
  //   sink(source);
  // });
});