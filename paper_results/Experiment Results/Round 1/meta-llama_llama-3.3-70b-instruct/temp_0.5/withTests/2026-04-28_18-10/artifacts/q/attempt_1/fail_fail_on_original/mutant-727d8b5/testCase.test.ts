import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should call the progress listener with the notify values", () => {
        var deferred1 = Q.defer();
        var deferred2 = Q.defer();

        var progressValues = [];

        Q.delay(50).then(function () {
            deferred1.notify("a");
        });
        Q.delay(100).then(function () {
            deferred2.notify("b");
            deferred2.resolve();
        });
        Q.delay(150).then(function () {
            deferred1.notify("c"); 
            deferred1.resolve();
        });

        return Q.any([deferred1.promise, deferred2.promise])
          .delay(250)
          .then(function() {
              expect(progressValues).toEqual([{
                  index: 0,
                  value: "a"
              }, {
                  index: 1,
                  value: "b"
              }]);
            },
            undefined,
            function(progressValue) {
                progressValues.push(progressValue);
            }
          );
    });
});