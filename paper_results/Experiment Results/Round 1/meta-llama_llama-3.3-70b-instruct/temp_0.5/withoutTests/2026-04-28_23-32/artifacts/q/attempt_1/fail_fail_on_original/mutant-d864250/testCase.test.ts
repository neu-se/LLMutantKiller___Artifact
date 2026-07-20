import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should set property on fulfilled promise', () => {
        const promise = Q({ a: 1 });
        const result = promise.dispatch("set", ["b", 2]);
        return result.then((value) => {
            expect(value).toBeUndefined();
            return promise.dispatch("get", ["b"]);
        }).then((value) => {
            expect(value).toBe(2);
        });
    });
});