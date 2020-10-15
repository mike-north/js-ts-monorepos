import { isChannel, isMessage, isTeam, isTypedArray } from "../src";

describe("isChannel() tests", function () {
  test("valid channel", () => {
    expect(
      isChannel({
        id: "123",
        teamId: "12gh",
        description: "channel description",
        iconUrl: "",
        messages: [],
        name: "general",
      })
    ).toEqual(true);
  });
  test("invalid channel", () => {
    expect(
      isChannel({
        description: "channel description",
        messages: [],
        name: "general",
      })
    ).toEqual(false);
  });
});

describe("isMessage() tests", function () {
  test("valid message", () => {
    expect(
      isMessage({
        id: 131,
        teamId: "12gh",
        channelId: "12gh",
        userId: "12gh",
        body: "hello, world",
      })
    ).toEqual(true);
  });
  test("invalid message", () => {
    expect(
      isMessage({
        description: "message description",
        messages: [],
        name: "general",
      })
    ).toEqual(false);
  });
});

describe("isTeam() tests", function () {
  test("valid message", () => {
    expect(
      isTeam({
        name: "12gh",
        id: "12gh",
        channels: [],
      })
    ).toEqual(true);
  });
  test("invalid message", () => {
    expect(
      isTeam({
        name: "12gh",
        id: "12gh",
      })
    ).toEqual(false);
  });
});

describe("isTypedArray() tests", function () {
  test("non-array", () => {
    expect(
      // @ts-expect-error
      isTypedArray(null, () => true)
    ).toEqual(false);
  });
  test("empty array", () => {
    expect(isTypedArray([], (x: any): x is any => true)).toEqual(true);
  });
  test("homogenous array [1, 2, 3]", () => {
    expect(
      isTypedArray([1, 2, 3], (x): x is number => typeof x === "number")
    ).toEqual(true);
  });
  test("mixed array [1, 'a', 3]", () => {
    expect(
      isTypedArray(
        [1, "a", 3],
        (x): x is number => ["number"].indexOf(typeof x) >= 0
      )
    ).toEqual(false);
  });
});
