# Architecture rules

- Animate rowing positions with compositor transforms through element refs and cached course geometry; only publish milestone and leader changes to React state, avoiding layout work and full timeline renders on each animation frame.
- Schedule rowing animation on passive scroll/resize events and stop after settling; measure course dimensions with ResizeObserver rather than every frame.
- Serve the GitHub Pages hero video from the existing public path as H.264/AAC MP4 with fast-start metadata; retain portable media delivery outside Lovable hosting.
- Keep background video muted until the sound control is pressed and pause playback while offscreen to reduce mobile decoding work.
- Separate race progress from sticky release using the measured scene height, reserving a final viewport of pinned scrolling after arrival so the last event is shown before the archive.
- Use a shared stable viewport-height hook for the video section and story geometry; ignore mobile height-only resize events so browser toolbar changes cannot shift the story during scrolling.
- Use static overlay fades rather than masking animated boats; confine mobile snowfall to the video and keep mobile water ripples static to reduce scroll-time compositing.
- Pin the story scene with JS-toggled position: fixed (absolute before/after its range) instead of sticky, use whole-pixel wrapper heights, and snap boat offsets to device pixels; iOS WebKit shakes sticky layers when their contents update during scrolling.
