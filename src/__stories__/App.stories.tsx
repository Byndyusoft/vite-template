import App from '../App.tsx';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Example/App',
    component: App
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AppStory: Story = {
    name: 'Default',
    args: {}
};
