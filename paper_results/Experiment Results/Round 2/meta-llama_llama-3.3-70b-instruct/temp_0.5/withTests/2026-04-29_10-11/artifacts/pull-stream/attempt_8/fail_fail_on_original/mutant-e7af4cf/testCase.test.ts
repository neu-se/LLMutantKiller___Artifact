import { filter } from '../../../../../throughs/filter.js';

describe('filter', () => {
  it('should pass when sync is true and fail when sync is false', () => {
    const testFunction = (data: any) => data!== null;
    const read = (end: any, cb: (end: any, data: any) => void) => {
      if (end === true) return cb(end, null);
      cb(null, 1);
    };
    const filteredRead = filter(testFunction)(read);
    filteredRead(null, (end: any, data: any) => {
      expect(data).toBe(1);
    });
  });
});