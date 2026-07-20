import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const error = new Error("Test error");
        
        Q.nextTick.runAfter(function () {
            const atReport = Q.reportedUnhandledRejections.indexOf(promise);
            if (atReport !== -1) {
                process.emit("rejectionHandled", Q.unhandledReasons[atReport], promise);
                Q.reportedUnhandledRejections.splice(atReport, 1);
            }
        });

        Q.unhandledRejections.splice(Q.unhandledRejections.indexOf(promise), 1);
        Q.unhandledReasons.splice(Q.unhandledReasons.indexOf(error.stack), 1);

        deferred.reject(error);
        Q.nextTick(() => {
            expect(Q.unhandledReasons).not.toContain(error.stack);
            expect(Q.unhandledRejections).not.toContain(promise);
        });
    });
});