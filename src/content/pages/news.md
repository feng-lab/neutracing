---
title: "News"
description: "Release notes and project updates for neuTube."
navTitle: "News"
navOrder: 3
homeFeatured: true
---

### A brief introduction on OMIC Tools

[Visualizing the brain networks with neuTube](https://omictools.com/blog/visualizing-brain-networks-with-neutube)

### New Edition Release

#### 2017.11.30

We have released our [software for reconstructing neurons from bright-field images](http://personal.psu.edu/dzj2/ShuTu/).

### neuTube 1.0z Release Notes

#### Patch 2018.07.12

- Reorganized settings for automatic tracing
- Preserve SWC IDs if they are consistent with the structure
- Fixed a bug of slight misalignment in 3D visualization

#### Patch 2017.01.09

- Fixed a file name bug in the Windows version
- Added more camera setting options for 3D visualization
- Several other minor bug fixes

#### Patch 2016.06.09

Note: this is supposed to be the last release supporting Mac OSX 10.9 or lower.

- Improved automatic tracing
- Several bug fixes

#### Important changes

- `Shift + Mouse wheel` is no longer used for zooming and now performs fast scrolling. Use `Ctrl/Cmd + Mouse wheel` instead for zooming. You can also press the right button and drag to zoom in or out.
- Terminal node color was changed to orange.

#### New functions

- Automatic radius estimation after extending a branch with path searching
- Use a bounding box to select nodes in the 3D window (`Shift+R` to draw a box, then `[Shift]+S` to add or refresh selection)
- Improved skeleton view in the 2D window
