import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should handle nextTick correctly", () => {
        const deferred = Q.defer();
        const nextTickSpy = jest.spyOn(Q, 'nextTick');
        Q.nextTick(() => {
            deferred.resolve();
        });
        expect(nextTickSpy).toHaveBeenCalledTimes(1);
        return deferred.promise;
    });
});