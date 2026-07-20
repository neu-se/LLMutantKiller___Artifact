import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("correctly composes when other starts with retain and this has leading inserts followed by retain", () => {
    // this: [insert "AB", retain 3]
    // other: [retain 5]
    // 
    // WITH optimization:
    //   firstOther = {retain: 5}, firstLeft starts at 5
    //   thisIter.peekType() === 'insert', peekLength() = 2 <= 5: ops.push(insert "AB"), firstLeft = 3
    //   thisIter.peekType() === 'retain' (not 'insert'): stop
    //   otherIter.next(5-3=2) -> consumes 2 of retain 5, leaving retain 3 in otherIter
    //   delta = new Delta([insert "AB"])
    //   Main loop: thisIter has retain 3, otherIter has retain 3
    //     length=3, thisOp=retain 3, otherOp=retain 3
    //     newOp = {retain: 3}
    //     !otherIter.hasNext() && isEqual(delta.ops[last], {retain:3}) -> false (last is insert "AB")
    //     delta.push({retain: 3})
    //   result: [insert "AB", retain 3].chop() = [insert "AB"] (retain at end with no attrs gets chopped!)
    //
    // WITHOUT optimization (mutation):
    //   delta = new Delta([])
    //   Main loop: otherIter.peekType()='retain'(not insert), thisIter.peekType()='insert'(not delete)
    //     length = min(2, 5) = 2, thisOp=insert "AB", otherOp=retain 2
    //     otherOp.retain truthy, thisOp.retain null -> newOp.insert = "AB"
    //     !otherIter.hasNext()? No (retain 3 left). delta.push({insert:"AB"})
    //   Next: length=min(3,3)=3, thisOp=retain 3, otherOp=retain 3
    //     newOp={retain:3}
    //     !otherIter.hasNext() && isEqual(delta.ops[last], {retain:3}) -> false
    //     delta.push({retain:3})
    //   result: [insert "AB", retain 3].chop() = [insert "AB"]
    //
    // Same result again...
    
    const base = new Delta().insert("AB").retain(3);
    const other = new Delta().retain(5);
    const result = base.compose(other);
    expect(result.ops).toEqual([{ insert: "AB" }]);
  });
});