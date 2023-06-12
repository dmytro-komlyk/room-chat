import type { Meta, StoryObj } from '@storybook/react';
import AuthLayout from './AuthLayout';
import { mockAuthLayoutProps } from './AuthLayout.mocks';

const meta: Meta<typeof AuthLayout> = {
  title: 'layouts/AuthLayout',
  component: AuthLayout,
};

export default meta;

type Story = StoryObj<typeof AuthLayout>;

export const Base: Story = {
  args: {
    ...mockAuthLayoutProps.base,
  },
};
