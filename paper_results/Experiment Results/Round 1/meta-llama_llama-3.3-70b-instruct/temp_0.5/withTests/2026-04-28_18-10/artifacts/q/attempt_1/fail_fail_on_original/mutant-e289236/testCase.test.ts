import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should test the behavior of the mutated file', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const messages = [];

        promise.then((value) => {
            messages.push(value);
        });

        deferred.resolve(10);

        expect(messages).toEqual([10]);
    });
});