import type { Meta, StoryObj } from '@storybook/react';
import BaseTemplate from './BaseTemplate';
import { mockBaseTemplateProps } from './BaseTemplate.mocks';

const meta: Meta<typeof BaseTemplate> = {
  title: 'templates/BaseTemplate',
  component: BaseTemplate,
};

export default meta;

type Story = StoryObj<typeof BaseTemplate>;

export const Base: Story = {
  args: {
    ...mockBaseTemplateProps.base,
  },
};
