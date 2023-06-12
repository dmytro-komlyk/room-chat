import type { Meta, StoryObj } from '@storybook/react';
import LoginForm from './LoginForm';
import { mockLoginFormProps } from './LoginForm.mocks';

const meta: Meta<typeof LoginForm> = {
  title: 'forms/LoginForm',
  component: LoginForm,
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Base: Story = {
  args: {
    ...mockLoginFormProps.base,
  },
};
