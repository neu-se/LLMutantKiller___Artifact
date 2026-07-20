import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('Promise', () => {
    it('should throw an error when inspect is not a function', () => {
        expect(() => Q.Promise({}, function fallback() {
            return this;
        }, 'not a function')).toThrowError();
    });
});