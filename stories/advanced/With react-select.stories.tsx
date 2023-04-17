import { Meta, StoryObj } from "@storybook/react";
import { CustomWindowComponentProps, List } from "../../src";
import React, { createContext, forwardRef, useContext } from "react";
import Select, { MenuListProps } from "react-select";
import { faker } from "@faker-js/faker";
import { mergeRefs } from "react-merge-refs";

const options = Array.from({ length: 1000 }, (_, i) => ({
  value: String(i),
  label: faker.music.songName(),
}));
export default {
  component: List,
} as Meta;

const MenuListContext = createContext<Omit<MenuListProps, "children">>(null!);

const Window = forwardRef<HTMLDivElement, CustomWindowComponentProps>(
  ({ children, style, scrollSize }, ref) => {
    const { maxHeight, innerProps, innerRef } = useContext(MenuListContext);
    return (
      <div
        ref={mergeRefs([ref, innerRef])}
        style={{ ...style, height: maxHeight, maxHeight }}
        {...innerProps}
      >
        <div style={{ position: "relative", height: scrollSize }}>
          {children}
        </div>
      </div>
    );
  }
);

const MenuList = ({ children, ...rest }: MenuListProps) => {
  return (
    <MenuListContext.Provider value={rest}>
      <List element={Window}>{children}</List>
    </MenuListContext.Provider>
  );
};

export const Default: StoryObj = {
  name: "With react-select",
  render: () => {
    return <Select options={options} components={{ MenuList }} />;
  },
};