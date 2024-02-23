import type {StorybookConfig} from "@storybook/react-vite";
import {plugins as codesandboxPlugins} from "./codesandbox/plugins";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [...codesandboxPlugins],
          },
        }
      },
    },
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  }
};
export default config;
