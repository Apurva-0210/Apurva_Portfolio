import { describe, it, expect } from "vitest";
import { profile, withBase } from "../data/profile";
import { clamp, loopOffset, wordLevel } from "../lib/motion-utils";

describe("Profile & Data Integrity", () => {
  it("has valid personal information", () => {
    expect(profile.name).toBe("Apurva Kumar");
    expect(profile.email).toBe("apurvak916@gmail.com");
    expect(profile.cgpa).toBe("8.62");
    expect(profile.links.github).toContain("github.com/Apurva-0210");
  });

  it("withBase resolves relative paths cleanly without double slashes", () => {
    const asset = withBase("assets/projects/cards/card_autera.png");
    expect(asset).toContain("assets/projects/cards/card_autera.png");
    expect(asset).not.toContain("//assets");
  });
});

describe("Motion & Calculation Helpers", () => {
  it("clamp bounds values correctly", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it("loopOffset calculates cyclic index offsets correctly", () => {
    const total = 12;
    expect(loopOffset(0, 0, total)).toBe(0);
    expect(loopOffset(1, 0, total)).toBe(1);
    expect(loopOffset(11, 0, total)).toBe(-1);
    expect(loopOffset(2, 0, total)).toBe(2);
    expect(loopOffset(10, 0, total)).toBe(-2);
  });

  it("wordLevel calculates opacity threshold correctly", () => {
    expect(wordLevel(0, 10, 0.5)).toBeGreaterThanOrEqual(0);
    expect(wordLevel(0, 10, 1.0)).toBe(1);
    expect(wordLevel(20, 10, 0.1)).toBe(0);
  });
});
