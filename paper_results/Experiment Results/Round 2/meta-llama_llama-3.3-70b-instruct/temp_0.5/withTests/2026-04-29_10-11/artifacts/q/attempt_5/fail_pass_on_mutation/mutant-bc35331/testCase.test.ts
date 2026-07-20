describe("nextTick function", () => {
    it("should use process.nextTick when process is defined and process.toString() returns '[object process]'", () => {
        var nextTick = function (task) {
            var head = { task: task, next: null };
            var tail = head;
            var flushing = false;
            var requestTick = function () {
                if (typeof process !== "undefined" && process.toString() === "[object process]") {
                    process.nextTick(flush);
                } else {
                    setTimeout(flush, 0);
                }
            };
            var flush = function () {
                while (head.next) {
                    head = head.next;
                    head.task();
                }
            };
            requestTick();
        };
        var task = function () {
            expect(true).toBe(true);
        };
        nextTick(task);
    });
});