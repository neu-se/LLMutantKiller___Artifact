import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('Promise', () => {
    it('should throw an error when inspect is not provided and fallback is not a function', () => {
        expect(() => Q.Promise({}, 'not a function')).toThrowError();
    });
});