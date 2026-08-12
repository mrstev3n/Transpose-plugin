<h1 align="center"><img alt="Transpose" src="assets/transpose.png" height="150px"/></h1>

<div align="center">
  A simple Figma plugin to flip any layer's size.
</div>

<div align="center">

</br>

![GitHub last commit](https://img.shields.io/github/last-commit/mrstev3n/Transpose-plugin?color=blue&style=plastic)
![Repo size](https://img.shields.io/github/repo-size/mrstev3n/Transpose-plugin?color=orange&style=plastic)

</div>

## Installation

Click below to install directly from the Figma community

<a href="https://www.figma.com/community/plugin/1009022712992810988/Transpose"><img alt="Install Plugin" src="https://img.shields.io/endpoint?url=https://figma-plugin-badges.vercel.app/api/installs/1009022712992810988" height=24/></a>

## Usage

### 1. Transpose > Each one

Select one or more layers and run the plugin. Each layer will be transposed individually while keeping its visual center.

!["Layer flip"](assets/banner.gif)

</br>

### 2. Transpose > Grouped

Select multiple layers and choose this option to transpose them as a visual group without overlap.

</br>

### 3. Direction > Vertical / Horizontal

For grouped transpose, choose whether the result should be stacked vertically or arranged horizontally.

</br>

## Editor support

Transpose is currently configured for **Figma Design** only. The manifest intentionally does not target FigJam or Dev Mode because the current transform logic is written for design-layer resizing and repositioning.

</br>

> #### Tips: Launch plugin actions with custom keyboard shortcuts
>
> For **Mac users**, it is possible to natively associate a keyboard shortcut to your Figma plugin from settings.
> - Learn more in this [YouTube video](https://www.youtube.com/watch?v=r-6q1AJNeTQ) or use
> [this method](https://www.youtube.com/watch?v=hkbTDbXc5Ng) for **Windows users**.

## Object handled

- RECTANGLE
- ELLIPSE
- POLYGON
- TEXT
- SHAPE_WITH_TEXT
- GROUP
- FRAME
- COMPONENT/ INSTANCE
- LINE (New: special handling to preserve the central position)

## Support

Do you find this plugin useful? </br> Please consider making a donation to support 🙏🏼

<p>
<a href="https://www.buymeacoffee.com/mrstev3n"><img alt="Buy Me A Coffee" src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" height=32></a>
<a href="https://liberapay.com/mrstev3n/"><img alt="Liberapay" src="https://img.shields.io/badge/Liberapay-F6C915?style=flat&logo=liberapay&logoColor=black" height=32></a>
</p>

## Code

### Quick Setup

- Clone the repository.
- `npm install` installs all the dependencies.
- `npm run build` builds and bundles the plugin.
- `npm run lint` checks the plugin against ESLint and Figma plugin rules.
- Import the manifest into Figma and test.

### Contribution

Contributions are welcome. Feel free to make a pull request or create an issue.

[![GitHub pull-requests](https://img.shields.io/github/issues-pr/mrstev3n/Transpose-plugin.svg)](https://GitHub.com/mrstev3n/Transpose-plugin/pull/)
[![GitHub issues](https://img.shields.io/github/issues/mrstev3n/Transpose-plugin.svg)](https://GitHub.com/mrstev3n/Transpose-plugin/issues/)

## Credits and Thanks

V2 - Maker: [@mrstev3n](https://github.com/mrstev3n),
V2 - Tester: [@rickfaf](https://github.com/rickfaf)

- Plugin with parameters: Transpose, each one | grouped

V1 - Maker: [@mrstev3n](https://github.com/mrstev3n)

- Run-once plugin with simple flip action

Big thanks to [@boussarilatif](https://github.com/boussarilatif) & [@rickfaf](https://github.com/rickfaf) for support, testing, and code snippets </br> useful for the proper functioning of the plugin.

</br>

## Other Links

<p>
<a href="https://figma.com/@steven"><img src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white" height=24></a>
<a href="https://twitter.com/mrstev3n"><img src="https://img.shields.io/badge/twitter-%231DA1F2.svg?&style=for-the-badge&logo=twitter&logoColor=white" height=24></a>
</p>

## License

© 2021 Steven Houessou-adin

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/mrstev3n/Transpose-plugin/blob/master/LICENSE)
