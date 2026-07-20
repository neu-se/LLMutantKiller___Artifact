import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should call the read function with the correct arguments when abort is called', (done) => {
    let calledWithAbort = false;
    const read = drain((data: any) => {
      return true;
    }, () => {
      done();
    });

    read(null, (end: any, data: any) => {
      read(true, (end: any, data: any) => {
        calledWithAbort = true;
        expect(end).toBe(true);
        done();
      });
    });
  });
});