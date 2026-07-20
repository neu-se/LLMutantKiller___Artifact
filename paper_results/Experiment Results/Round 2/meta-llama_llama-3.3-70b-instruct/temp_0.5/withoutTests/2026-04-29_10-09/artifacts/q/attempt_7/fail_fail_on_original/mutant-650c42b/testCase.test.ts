import { Q } from "./q";

describe('Q', () => {
    it('should dispatch a message to an object', () => {
        const object = { 
            get: (key: string) => {
                if (key === 'foo') {
                    return 'bar';
                }
            }
        };
        const op = 'get';
        const args = ['foo'];
        const result = Q.dispatch(object, op, args);
        expect(result).not.toBeUndefined();
    });
});