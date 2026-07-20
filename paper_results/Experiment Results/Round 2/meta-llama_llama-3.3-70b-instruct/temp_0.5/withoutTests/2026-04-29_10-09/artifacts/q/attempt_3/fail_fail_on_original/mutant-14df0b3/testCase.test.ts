import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.delete', () => {
    it('should return a promise that resolves when deleting a property', () => {
        const obj = { foo: 'bar' };
        const promise = Q["delete"](obj, 'foo');
        return expect(promise).resolves.not.toThrow();
    });

    it('should return undefined when deleting a property', () => {
        const obj = { foo: 'bar' };
        const promise = Q["delete"](obj, 'foo');
        return promise.then(result => {
            expect(result).toBeUndefined();
        });
    });
});