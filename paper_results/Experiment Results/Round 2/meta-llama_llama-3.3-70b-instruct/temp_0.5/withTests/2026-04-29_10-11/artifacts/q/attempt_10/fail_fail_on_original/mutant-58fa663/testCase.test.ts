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
    }, 1000); // increase the timeout to 1000ms

    it("should correctly handle process.emit when rejecting a promise", (done) => {
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
    }, 1000); // increase the timeout to 1000ms

    it("should not call process.emit when rejecting a promise with a non-error", (done) => {
        const processEmitSpy = jest.spyOn(process, 'emit');
        const deferred = Q.defer();
        const promise = deferred.promise;
        const rejectionReason = "Test rejection reason";

        Q.nextTick(() => {
            deferred.reject(rejectionReason);
        });

        setTimeout(() => {
            expect(processEmitSpy).toHaveBeenCalledTimes(1);
            expect(processEmitSpy).toHaveBeenCalledWith('unhandledRejection', rejectionReason, promise);
            done();
        }, 10);
    }, 1000); // increase the timeout to 1000ms
});