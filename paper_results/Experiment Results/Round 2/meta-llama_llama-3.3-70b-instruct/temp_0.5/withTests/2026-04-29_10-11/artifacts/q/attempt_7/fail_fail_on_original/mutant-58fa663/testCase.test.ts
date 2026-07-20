import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly handle unhandled rejections", (done) => {
        const processEmitSpy = jest.spyOn(process, 'emit');
        const deferred = Q.defer();
        const promise = deferred.promise;
        const error = new Error("Test error");

        Q.nextTick(() => {
            deferred.reject(error);
        });

        setTimeout(() => {
            expect(processEmitSpy).toHaveBeenCalledTimes(1);
            expect(processEmitSpy).toHaveBeenCalledWith('unhandledRejection', error, promise);
            done();
        }, 10);
    }, 100);
});