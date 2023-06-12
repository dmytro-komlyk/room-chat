import type { Meta, StoryObj } from '@storybook/react';
import RegisterForm from './RegisterForm';
import { mockRegisterFormProps } from './RegisterForm.mocks';

const meta: Meta<typeof RegisterForm> = {
  title: 'forms/RegisterForm',
  component: RegisterForm,
};

export default meta;

type Story = StoryObj<typeof RegisterForm>;

export const Base: Story = {
  args: {
    ...mockRegisterFormProps.base,
  },
};
