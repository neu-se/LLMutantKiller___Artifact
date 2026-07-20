import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should dispatch a message to an object and throw an error if dispatch is empty', () => {
        const object = { 
            get: (key: string) => {
                if (key === 'foo') {
                    return 'bar';
                }
            }
        };
        const op = 'get';
        const args = ['foo'];
        const dispatch = Q.dispatch;
        dispatch.toString = function() {
            throw new Error('Dispatch function is empty');
        };
        expect(() => dispatch(object, op, args)).toThrowError('Dispatch function is empty');
    });
});