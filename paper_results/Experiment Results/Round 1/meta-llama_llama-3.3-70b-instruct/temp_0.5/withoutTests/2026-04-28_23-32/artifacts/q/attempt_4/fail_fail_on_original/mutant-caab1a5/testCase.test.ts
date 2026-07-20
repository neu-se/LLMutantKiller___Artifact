import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the when method and return a promise', () => {
        const promise = Q.when(1, (value) => value, (error) => { throw error; });
        expect(promise.then).toBeInstanceOf(Function);
        expect(promise.then(() => {})).resolves.toBe(1);
    });
});