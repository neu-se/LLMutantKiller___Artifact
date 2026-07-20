import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find sink with error handling', () => {
  it('should pass null as error and null as data when error is true', (done) => {
    const test = (data: any) => false;
    const cb = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBeNull();
      done();
    };

    const source = () => {};
    source.abort = (err: any) => {
      find(test, cb)(null, err, () => {});
      find(test, cb)(true, null, () => {});
    };

    find(test, cb)(null, source, () => {});
  });
});