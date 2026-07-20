import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should call the read function with the correct arguments when abort is called', (done) => {
    let readCount = 0;
    let calledWithAbort = false;
    const read = drain((data: any) => {
      readCount++;
      return true;
    }, () => {
      done();
    });

    read(null, (end: any, data: any) => {
      expect(readCount).toBe(1);
      read(true, (end: any, data: any) => {
        calledWithAbort = true;
        expect(end).toBe(true);
        done();
      });
    });
  });
});