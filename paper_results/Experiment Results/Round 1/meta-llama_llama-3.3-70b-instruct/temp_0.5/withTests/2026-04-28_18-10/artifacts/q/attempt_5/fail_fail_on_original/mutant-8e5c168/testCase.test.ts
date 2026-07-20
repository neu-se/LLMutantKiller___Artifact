import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('promise function', () => {
    it('should return a promise when given a resolver function', () => {
        var resolver = function(resolve, reject) {
            resolve('resolved');
        };
        var promise = Q((resolve, reject) => {
            resolve('resolved');
        });
        expect(promise.then).toBeInstanceOf(Function);
    });
});