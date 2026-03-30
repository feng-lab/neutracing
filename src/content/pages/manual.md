---
title: "Manual"
description: "Reference manual for neuTube concepts, menus, editing tools, shortcuts, and Vaa3D plugin support."
navTitle: "Manual"
navOrder: 5
homeFeatured: true
---

**Note:** Version 1.0z was patched on Jul. 12, 2018.

## Terminology

The structure of a neuron is modeled as a tree, composed of a set of **nodes** and the edges connecting them. Each node is a ball in 3D space, and its size is specified by its radius. The edges form the **skeleton** of the neuron.

This simple model is also defined by the commonly used [SWC](http://research.mssm.edu/cnic/swc.html) format. Therefore, we sometimes refer to a node as a neuron node or an SWC node.

In neuTube, one neuron can have isolated nodes, which form multiple connected components. Creating a tree model from image data is called **tracing**.

Since neuTube is mainly designed for tracing 3D images, an **image** often means a 3D image, also called a **stack**. neuTube provides both 2D visualization and 3D visualization of image data and neuron structures. A window of 2D visualization is called a **2D window**, and similarly, 3D visualization is shown in a **3D window**. Edits in the 2D window and 3D window are called **2D editing** and **3D editing** respectively.

## Main Menu

![Main menu](/images/neutube/Slide2.png)

### File

- _File → Open…_: Open a file, which can be a TIFF or an SWC file.
- _File → Import → Image Sequence_: Import a sequence of images. When a TIFF file is selected, the program analyzes the file name pattern, extracts the base name and ending number, and loads all TIFF files with the same base name in ascending numeric order.
- _File → Expand Current → SWC_: Add an SWC file to the current document.
- _File → Expand Current → Mask_: Add a mask to the current document.
- _File → Save Image/Stack_: Save the current image or stack as a TIFF file.
- _File → Export → Mask_: Export the current mask as a TIFF file.

### Edit

- _Undo / Redo_: neuTube supports unlimited undo/redo for most SWC editing operations.

### View

- _View → Adjust → Brightness/Contrast_: Open the brightness and contrast dialog for the current image. The adjustment applies to all slices.
- _View → Object Mode_: Set the object view mode, which is for SWC only in the current version.
- _View → Object Mode → Dense_: Show objects in dense mode to display most details.
- _View → Object Mode → Sparse_: Show objects in sparse mode.
- _View → Object Mode → Skeleton_: Show objects in skeleton mode. Only the skeletons are shown if they are available.
- _View → Autosaved_: Show all automatically saved files. This is useful for recovering a reconstruction after a crash.
- _View → Information_: Show information about the current document.

### Tools

- _Tools → Process → Extract Channel_: Extract a channel from a multi-channel image.
- _Tools → Process → Invert_: Invert the color of the current image.
- _Tools → Manage Objects_: Show the list of objects in the current document.

## User Interaction

### Trace

![Trace example 1](/images/neutube/Slide4.png)

![Trace example 2](/images/neutube/Slide5.png)

### Editing

**Start:** Select any node or set of nodes, then right-click to open the context menu.

![Editing menu](/images/neutube/editing_menu.png)

#### Select Nodes

The simplest way to select a node is to click it with the left mouse button. Once a node is selected, its display pattern changes to reflect the selection status.

![Selection status](/images/neutube/select.png)

There are also several ways to select multiple nodes:

- **Cmd/Ctrl + click:** Select a node without deselecting nodes that are already selected. If the clicked node is already selected, this becomes a deselection operation.
- **Shift + click:** Select the path from the currently selected node or nodes to the newly selected node.
- **Alt + click:** Select all nodes growing from the clicked node until meeting other selected nodes.

![Cmd/Ctrl selection](/images/neutube/cmd_selection1.png)

![Shift selection](/images/neutube/shift_selection.png)

![Alt selection](/images/neutube/alt_selection.png)

The hotkey `Cmd/Ctrl + A` selects all nodes.

#### Extend

![Extend](/images/neutube/extend.png)

#### Connect

neuTube provides several ways to connect nodes:

- _Select a node and then connect to another_

![Connect one node](/images/neutube/connect.png)

- _Select multiple nodes and connect_

Tip: the shortcut key for this operation is `C`.

![Connect multiple nodes](/images/neutube/connectm.png)

- _Connect to the closest node_

![Connect nearest node](/images/neutube/connectn.png)

#### Change Position

**Change X-Y position**

The four keys `A`, `W`, `S`, and `D` are used to change the node position on the X-Y plane.

![Change X-Y position](/images/neutube/change_position.png)

You can also use the mouse to move the selected nodes. Trigger `Move Selected (Shift+Mouse)` in the context menu and the cursor changes to a hand shape. Hold `Shift` and press the left button to move the selected nodes around.

**Change Z position**

Changing the Z position of a node is a little more complicated:

1. Select one or more nodes to change Z.
2. Move the image plane to the target position. Any selected node will move its center to the displayed plane.
3. Trigger the `Move to Current Plane` command in the context menu.

![Change Z position](/images/neutube/change_z1.png)

The shortcut key is `F`.

#### Change Size

Changing the size of a node is linked to the `Q` and `E` keys.

After selecting one or more nodes, hit `Q` to make them smaller or `E` to make them bigger. These two keys are close to the position keys so the user can change position or size without moving their hands.

#### Remove

**Delete nodes**

Select nodes to delete, then hit `Del` or `X`. Another way is to use the `Delete` command in the context menu.

**Remove edges**

Select the nodes forming the edges to delete, then hit `B`. The corresponding command in the context menu is `Break`.

Note that the nodes must be directly connected:

![Break connection](/images/neutube/break.png)

### 3D Editing

Most editing functions in the 3D window are similar to those in the 2D window.

![3D editing](/images/neutube/figure.png)

Note: The interface shown is from v0.93+, which has a slightly different control layout compared to older versions. In older versions, `Neurons` was `Swcs`, `Neuron Nodes` was `Swc Nodes`, `Image` was `Volume`, and `General` was `Utils`.

Special functions in 3D:

#### Locate node(s) in 2D

![Locate node](/images/neutube/locate_node.png)

#### Change Node Type in 3D

![Change node type](/images/neutube/neuron_type.png)

### Hot Keys

`Cmd` is referred to as `Ctrl` on PC.

#### General

- `Cmd+A`: Select all SWC nodes
- `Cmd+Z`: Undo
- `Cmd+Shift+Z`: Redo
- `Backspace/Delete`: Delete selected objects
- `Space`: Extend
- `C`: Connect selected SWC nodes
- `N`: Connect to the nearest SWC node (only works for a single selected node)
- `B`: Break SWC node connections
- `V`: Enable moving selected objects with the mouse

#### 2D Window

- `G`: Turn on adding an SWC node
- `[Shift] A`: Move image or SWC node to the left. Hold `Shift` for fast movement.
- `[Shift] D`: Move image or SWC node to the right
- `[Shift] W`: Move image or SWC node up
- `[Shift] S`: Move image or SWC node down
- `= / Up Arrow`: Zoom in
- `- / Down Arrow`: Zoom out
- `Left Arrow`: Decrease Z position
- `Right Arrow`: Increase Z position
- `< / Q`: Decrease radius
- `> / E`: Increase radius
- `F`: Change focus of selected nodes to the current plane

#### 3D Window

- `=`: Zoom in
- `-`: Zoom out
- `All Arrows`: Rotate
- `[Shift] Arrows`: Move
- `<`: Decrease radius
- `>`: Increase radius
- `Cmd + S`: Save SWC
- `Cmd + Plus`: Increase SWC size scale
- `Cmd + Minus`: Decrease SWC size scale
- `Cmd + M`: Change SWC display mode
- `Z`: Locate selected nodes in 2D

## Vaa3D Plugin

neuTube can be integrated into [Vaa3D](http://vaa3d.org) as a plugin. You can find it in the Vaa3D menu at `Plug-In > neuron_tracing > neutube`.
