import { Q } from '../../../q.js';

describe('Promise', () => {
    it('should throw an error when inspect is not provided', () => {
        expect(() => Q.Promise({}, undefined)).toThrowError();
    });
});