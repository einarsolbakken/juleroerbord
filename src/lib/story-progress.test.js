import { describe, expect, test } from "bun:test";
import { getStoryProgress } from "./story-progress";

describe("story finish before scrolling onward", () => {
  test("arrives at Byen while a full viewport of pinned scrolling remains", () => {
    expect(getStoryProgress(5700, 7400, 850)).toBe(1);
    expect(getStoryProgress(5650, 7400, 850)).toBeLessThan(1);
  });

  test("stays at Byen throughout the final pinned viewport", () => {
    expect(getStoryProgress(6100, 7400, 850)).toBe(1);
    expect(getStoryProgress(6550, 7400, 850)).toBe(1);
  });
});