# Architecture rules

- Animate rowing positions through element refs; only publish milestone and leader changes to React state, avoiding full timeline renders on each animation frame.
- Schedule rowing animation on passive scroll/resize events and stop after settling; measure course dimensions with ResizeObserver rather than every frame.
- Serve the GitHub Pages hero video from the existing public path as H.264/AAC MP4 with fast-start metadata; retain portable media delivery outside Lovable hosting.
- Keep background video muted until the sound control is pressed and pause playback while offscreen to reduce mobile decoding work.
- Separate race progress from sticky release using the measured scene height, reserving a final viewport of pinned scrolling after arrival so the last event is shown before the archive.