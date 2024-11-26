import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { SportsBg } from "./sportsBg";
import nearbySceneryImg from "../../assets/images/public/sports-bg/nearby-scenery.png";
import distantSceneryImg from "../../assets/images/public/sports-bg/distant-scenery.png";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Public/sportsBg",
  component: SportsBg,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof SportsBg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Only: Story = {
  args: {
    id: "id1123",
    src: nearbySceneryImg,
    // src:distantSceneryImg,
    width: 450, // 容器宽度
    height: 60, // 容器高度
    imgWidth: 200, // 图片宽度
    duration: 1, // 过渡到容器宽度距离 需要的时长
    status: true, // 动画是否启动
  },
};

export const Multiple: Story = {

  args: {
    id: "id1123",
    src: nearbySceneryImg,
    width: 450, // 容器宽度
    height: 200, // 容器高度
    imgWidth: 200, // 图片宽度
    duration: 1, // 过渡到容器宽度距离 需要的时长
    status: true, // 动画是否启动
  },
  render: () => {
    return (
      <div style={{
        position: 'relative',
        height: 200,
        width: 450
      }}>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            zIndex:20,
          }}>
          <SportsBg
            id="id1123-2"
            src={nearbySceneryImg}
            width={450}
            height={60}
            imgWidth={200}
            duration={1}
            status={true}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}>
          <SportsBg
            id="id1123-3"
            src={distantSceneryImg}
            width={450}
            height={200}
            imgWidth={750}
            duration={20}
            status={true}
          />
        </div>
      </div>
    );
  },

};
