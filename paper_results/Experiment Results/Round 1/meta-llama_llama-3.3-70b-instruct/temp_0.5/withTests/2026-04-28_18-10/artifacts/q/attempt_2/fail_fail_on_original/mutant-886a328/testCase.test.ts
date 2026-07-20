import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('Q', () => {
    it('should throw an error with a specific message when Q.noConflict is called in a non-browser environment', () => {
        expect(() => Q.noConflict()).toThrowError('Q.noConflict only works when Q is used as a global');
    });
});