// Reserve one viewport of pinned scrolling after arrival at the finish.
export function getStoryProgress(scrollDistance: number, wrapperHeight: number, viewportHeight: number): number {
  const travelDistance = wrapperHeight - viewportHeight * 2;
  if (travelDistance <= 0) return 0;
  return Math.min(1, Math.max(0, scrollDistance / travelDistance));
}