import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should dispatch a message to an object', () => {
        const object = { foo: 'bar' };
        const op = 'get';
        const args = ['foo'];
        const result = Q.dispatch(object, op, args);
        expect(result).resolves.toBe('bar');
    });
});