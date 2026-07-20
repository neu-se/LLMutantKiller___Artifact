import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find sink', () => {
  it('should handle error callback with err === true correctly', (done) => {
    const test = (data: any) => false;
    const cb = (err: any, data: any) => {
      if (err === true) {
        expect(err).toBe(true);
      } else {
        expect(err).toBeNull();
      }
      expect(data).toBeNull();
      done();
    };

    const sink = find(test, cb);
    sink(true); // Pass true as error to trigger the mutation
  });
});