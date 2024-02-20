import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Button } from '../Button/Button';
import { Box, boxPropsKeys } from '../Box/Box';
import { Details, DetailsProps } from './Details';

const meta: Meta<typeof Details> = {
  title: 'Components/Details/Playground',
  component: Details,
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    ...boxPropsKeys.reduce((acc, curr) => ({ ...acc, [curr]: { table: { disable: true } } }), {}),
  },
};

export default meta;

const Template: StoryFn<DetailsProps> = ({
  isOpen,
  summaryText,
  detailsText,
  ...args
}) => (
  <Details isOpen={isOpen} {...args}>
    <Details.Summary isDetailsOpen={isOpen}>
      <Button>{summaryText}</Button>
    </Details.Summary>
    <Box padding="lg" background="grey-50" margin="sm 0 0 0">
      {detailsText}
    </Box>
  </Details>
);

/**
 * Use the playground to see different results
 */
export const Playground = Template.bind({});

Playground.args = {
  isOpen: false,
  summaryText: 'Summary',
  detailsText: 'Details go here!',
};
