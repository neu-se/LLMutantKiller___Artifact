import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.delete', () => {
    it('should delete a property from an object', () => {
        const obj = { foo: 'bar' };
        const promise = Q(obj).delete('foo');
        return promise.then((result) => {
            expect(result).toBeUndefined();
            expect(obj).not.toHaveProperty('foo');
        });
    });

    it('should reject if the operation name is empty', () => {
        const obj = { foo: 'bar' };
        const promise = Q(obj).dispatch("", ['foo']);
        return promise.catch((error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});