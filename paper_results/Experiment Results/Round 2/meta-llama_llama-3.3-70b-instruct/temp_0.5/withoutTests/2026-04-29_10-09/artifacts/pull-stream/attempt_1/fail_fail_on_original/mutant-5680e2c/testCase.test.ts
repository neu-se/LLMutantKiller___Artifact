import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through function', () => {
  it('should call onEnd with correct abort value', () => {
    const onEnd = jest.fn();
    const op = (data: any) => data;
    const throughStream = through(op, onEnd);
    const read = jest.fn((end: any, cb: any) => {
      cb(null, 'data');
    });
    throughStream(read)(null, (end: any, data: any) => {
      throughStream(read)(true, (end: any, data: any) => {
        expect(onEnd).toHaveBeenCalledTimes(1);
        expect(onEnd).toHaveBeenCalledWith(null);
      });
    });
  });
});