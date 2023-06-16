import type { Meta, StoryObj } from '@storybook/react';
import SidebarLayout from './SidebarLayout';
import { mockSidebarLayoutProps } from './SidebarLayout.mocks';

const meta: Meta<typeof SidebarLayout> = {
  title: 'layouts/SidebarLayout',
  component: SidebarLayout,
};

export default meta;

type Story = StoryObj<typeof SidebarLayout>;

export const Base: Story = {
  args: {
    ...mockSidebarLayoutProps.base,
  },
};
