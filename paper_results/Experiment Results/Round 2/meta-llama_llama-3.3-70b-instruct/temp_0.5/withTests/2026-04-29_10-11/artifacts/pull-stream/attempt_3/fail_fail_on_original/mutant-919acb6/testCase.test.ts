import { drain } from "../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should handle end condition correctly', () => {
    const read = drain((data: any) => {
      return data !== 2;
    }, (end: any) => {
      expect(end).toBeUndefined();
    });
    read(null, (end: any, data: any) => {
      expect(data).toBe(1);
      read(null, (end: any, data: any) => {
        expect(data).toBe(2);
      });
    });
    read(null, (end: any, data: any) => {
      expect(data).toBeUndefined();
    });
  });
});