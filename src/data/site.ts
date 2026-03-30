export const site = {
  meta: {
    title: "neuTube",
    tagline: "Free software for neuron tracing",
    url: "https://neutracing.com",
    repositoryUrl: "https://github.com/tingzhao/neutube",
  },
  tutorialVideos: [
    {
      title: "Explore data",
      url: "https://www.youtube.com/watch?v=qOumCANf2RY",
      embedUrl: "https://www.youtube.com/embed/qOumCANf2RY",
    },
    {
      title: "Single-branch tracing",
      url: "https://www.youtube.com/watch?v=zEkXbCIAubw",
      embedUrl: "https://www.youtube.com/embed/zEkXbCIAubw",
    },
    {
      title: "Selection",
      url: "https://www.youtube.com/watch?v=jpDrlxX_Plg",
      embedUrl: "https://www.youtube.com/embed/jpDrlxX_Plg",
    },
    {
      title: "Extend branch",
      url: "http://youtu.be/YPKoZGdF24o",
      embedUrl: "https://www.youtube.com/embed/YPKoZGdF24o",
    },
    {
      title: "Morphological editing",
      url: "https://www.youtube.com/watch?v=HYUmjubd4bA",
      embedUrl: "https://www.youtube.com/embed/HYUmjubd4bA",
    },
    {
      title: "Topological Editing",
      url: "https://www.youtube.com/watch?v=Cod2Uhive-Y&feature=youtu.be",
      embedUrl: "https://www.youtube.com/embed/Cod2Uhive-Y",
    },
    {
      title: "Complete tracing of a neuron",
      url: "https://www.youtube.com/watch?v=QlCl_U2Zwkc",
      embedUrl: "https://www.youtube.com/embed/QlCl_U2Zwkc",
    },
  ],
  downloadPage: {
    sections: [
      {
        title: "Build Version 1.0z (2018.07.12)",
        level: 2,
        downloadSlugs: ["build-1-0z-2018-07-macos-10-7", "build-1-0z-2018-07-windows-64-bit"],
      },
      {
        title: "Source code",
        level: 2,
        link: {
          label: "github.com/tingzhao/neutube",
          href: "https://github.com/tingzhao/neutube",
        },
        note: "The branch to clone is `neutube`.",
        downloadSlugs: [],
      },
      {
        title: "Test Image",
        level: 2,
        downloadSlugs: ["test_image"],
      },
      {
        title: "Example Image With One Reconstructed SWC",
        level: 2,
        downloadSlugs: ["example-neuron-image", "example-reconstructed-swc"],
      },
      {
        title: "Old Versions",
        level: 2,
        downloadSlugs: [],
      },
      {
        title: "Build Version 1.0z (2017.01.09)",
        level: 3,
        downloadSlugs: ["build-1-0z-2017-01-os-x-10-7", "build-1-0z-2017-01-windows-64-bit-2"],
      },
      {
        title: "Build Version 1.0z (2016.06.09)",
        level: 3,
        downloadSlugs: ["build-1-0z-2016-os-x-10-7", "build-1-0z-2016-windows-64-bit"],
      },
      {
        title: "Build Version 1.0z (2015.10.14)",
        level: 3,
        downloadSlugs: ["build-1-0z-os-x-10-7", "build-1-0z-windows-64-bit"],
      },
      {
        title: "Build Version 1.0x (2015.01.30)",
        level: 3,
        downloadSlugs: ["os-x-10-7", "build-1-0x-windows-64-bit"],
      },
      {
        title: "Build Version 1.0 (2014.06.03)",
        level: 3,
        downloadSlugs: ["mac-10-6", "windows-64-bit", "fedora"],
      },
    ],
  },
} as const;

export default site;
